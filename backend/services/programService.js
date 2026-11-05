import Program from '../models/Program.js';
import Basket from '../models/Basket.js';
import ProgramContent from '../models/ProgramContent.js';

export const createProgram = async (programData) => {
  const { basketId } = programData;
  if (!basketId) {
    const error = new Error('Basket ID is required');
    error.statusCode = 400;
    throw error;
  }

  // Verify that the referenced basket exists and is not deleted
  const basket = await Basket.findOne({ _id: basketId, isDeleted: false });
  if (!basket) {
    const error = new Error('Referenced basket not found or inactive');
    error.statusCode = 404;
    throw error;
  }

  const program = new Program(programData);
  return await program.save();
};

export const getAllPrograms = async ({ search, status, basketId, sortBy = 'displayOrder', sortOrder = 'asc', includeContent = 'false' } = {}) => {
  const filter = { isDeleted: false };

  if (search) {
    filter.name = { $regex: search.trim(), $options: 'i' };
  }

  if (status) {
    filter.status = status;
  }

  if (basketId) {
    filter.basketId = basketId;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  if (sortBy !== '_id') {
    sort._id = 1;
  }

  let query = Program.find(filter)
    .populate('basketId', 'name slug tagline displayOrder status')
    .sort(sort);

  if (includeContent === 'true' || includeContent === true) {
    query = query.populate({
      path: 'content',
      match: { isDeleted: false },
    });
  }

  return await query.exec();
};

export const getProgramById = async (id, { includeContent = 'true' } = {}) => {
  let query = Program.findOne({ _id: id, isDeleted: false }).populate(
    'basketId',
    'name slug tagline displayOrder status'
  );

  if (includeContent === 'true' || includeContent === true) {
    query = query.populate({
      path: 'content',
      match: { isDeleted: false },
    });
  }

  return await query.exec();
};

export const getProgramsByBasketId = async (basketId, { search, status, sortBy = 'displayOrder', sortOrder = 'asc' } = {}) => {
  // Verify basket exists
  const basket = await Basket.findOne({ _id: basketId, isDeleted: false });
  if (!basket) {
    const error = new Error('Basket not found');
    error.statusCode = 404;
    throw error;
  }

  const filter = { basketId, isDeleted: false };

  if (search) {
    filter.name = { $regex: search.trim(), $options: 'i' };
  }

  if (status) {
    filter.status = status;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  if (sortBy !== '_id') {
    sort._id = 1;
  }

  return await Program.find(filter)
    .populate('basketId', 'name slug tagline')
    .populate({
      path: 'content',
      match: { isDeleted: false },
    })
    .sort(sort)
    .exec();
};

export const updateProgram = async (id, updateData) => {
  const sanitizedData = { ...updateData };
  delete sanitizedData.isDeleted;
  delete sanitizedData._id;

  // If basketId is being changed, verify the new basket exists
  if (sanitizedData.basketId) {
    const basket = await Basket.findOne({ _id: sanitizedData.basketId, isDeleted: false });
    if (!basket) {
      const error = new Error('Target basket not found or inactive');
      error.statusCode = 404;
      throw error;
    }
  }

  return await Program.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: sanitizedData },
    { new: true, runValidators: true }
  ).populate('basketId', 'name slug tagline');
};

export const moveProgram = async (id, newBasketId) => {
  if (!newBasketId) {
    const error = new Error('New basket ID is required to move program');
    error.statusCode = 400;
    throw error;
  }

  // Verify target basket exists and is not deleted
  const targetBasket = await Basket.findOne({ _id: newBasketId, isDeleted: false });
  if (!targetBasket) {
    const error = new Error('Target basket not found or inactive');
    error.statusCode = 404;
    throw error;
  }

  const updatedProgram = await Program.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { basketId: newBasketId } },
    { new: true }
  ).populate('basketId', 'name slug tagline');

  if (!updatedProgram) {
    const error = new Error('Program not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedProgram;
};

export const deleteProgram = async (id) => {
  const program = await Program.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!program) {
    return null;
  }

  // Soft delete associated content
  await ProgramContent.findOneAndUpdate(
    { programId: id, isDeleted: false },
    { $set: { isDeleted: true } }
  );

  return program;
};

