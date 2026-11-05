import Basket from '../models/Basket.js';
import Program from '../models/Program.js';
import ProgramContent from '../models/ProgramContent.js';

export const createBasket = async (basketData) => {
  const basket = new Basket(basketData);
  return await basket.save();
};

export const getAllBaskets = async ({ search, status, sortBy = 'displayOrder', sortOrder = 'asc', includePrograms = 'false' } = {}) => {
  const filter = { isDeleted: false };

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

  let query = Basket.find(filter).sort(sort);

  if (includePrograms === 'true' || includePrograms === true) {
    query = query.populate({
      path: 'programs',
      match: { isDeleted: false },
      options: { sort: { displayOrder: 1 } },
    });
  }

  return await query.exec();
};

export const getBasketById = async (id, { includePrograms = 'true' } = {}) => {
  let query = Basket.findOne({ _id: id, isDeleted: false });

  if (includePrograms === 'true' || includePrograms === true) {
    query = query.populate({
      path: 'programs',
      match: { isDeleted: false },
      options: { sort: { displayOrder: 1 } },
    });
  }

  return await query.exec();
};

export const updateBasket = async (id, updateData) => {
  // Prevent overriding deletion flag through standard update
  const sanitizedData = { ...updateData };
  delete sanitizedData.isDeleted;
  delete sanitizedData._id;

  return await Basket.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: sanitizedData },
    { new: true, runValidators: true }
  );
};

export const deleteBasket = async (id) => {
  // Soft delete basket
  const basket = await Basket.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!basket) {
    return null;
  }

  // Also soft delete associated programs and their content
  const programs = await Program.find({ basketId: id, isDeleted: false });
  const programIds = programs.map((p) => p._id);

  if (programIds.length > 0) {
    await Program.updateMany({ _id: { $in: programIds } }, { $set: { isDeleted: true } });
    await ProgramContent.updateMany({ programId: { $in: programIds } }, { $set: { isDeleted: true } });
  }

  return basket;
};

