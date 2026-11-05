import ProgramContent from '../models/ProgramContent.js';
import Program from '../models/Program.js';

export const createProgramContent = async (contentData) => {
  const { programId } = contentData;
  if (!programId) {
    const error = new Error('Program ID is required');
    error.statusCode = 400;
    throw error;
  }

  // Verify that the referenced program exists and is not deleted
  const program = await Program.findOne({ _id: programId, isDeleted: false });
  if (!program) {
    const error = new Error('Referenced program not found or inactive');
    error.statusCode = 404;
    throw error;
  }

  // Check if content already exists for this program
  const existingContent = await ProgramContent.findOne({ programId });

  if (existingContent) {
    if (!existingContent.isDeleted) {
      const error = new Error('Program content already exists for this program. Use PUT to update.');
      error.statusCode = 409;
      throw error;
    }

    // If soft-deleted previously, restore and update with new data
    const sanitizedData = { ...contentData };
    delete sanitizedData._id;
    sanitizedData.isDeleted = false;

    Object.assign(existingContent, sanitizedData);
    return await existingContent.save();
  }

  const content = new ProgramContent(contentData);
  return await content.save();
};

export const getProgramContentByProgramId = async (programId) => {
  // Check program exists
  const program = await Program.findOne({ _id: programId, isDeleted: false });
  if (!program) {
    const error = new Error('Program not found');
    error.statusCode = 404;
    throw error;
  }

  return await ProgramContent.findOne({
    programId,
    isDeleted: false,
  }).populate('programId', 'name slug basketId status');
};

export const updateProgramContent = async (programId, updateData) => {
  const sanitizedData = { ...updateData };
  delete sanitizedData.isDeleted;
  delete sanitizedData._id;
  delete sanitizedData.programId;

  const content = await ProgramContent.findOneAndUpdate(
    { programId, isDeleted: false },
    { $set: sanitizedData },
    { new: true, runValidators: true }
  ).populate('programId', 'name slug basketId');

  if (!content) {
    const error = new Error('Program content not found');
    error.statusCode = 404;
    throw error;
  }

  return content;
};

export const deleteProgramContent = async (programId) => {
  const content = await ProgramContent.findOneAndUpdate(
    { programId, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!content) {
    const error = new Error('Program content not found');
    error.statusCode = 404;
    throw error;
  }

  return content;
};

