import * as programContentService from '../services/programContentService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const createProgramContent = async (req, res, next) => {
  try {
    const content = await programContentService.createProgramContent(req.body);
    return successResponse(res, 201, 'Program content created successfully', content);
  } catch (error) {
    next(error);
  }
};

export const getContentByProgramId = async (req, res, next) => {
  try {
    const { programId } = req.params;
    const content = await programContentService.getProgramContentByProgramId(programId);

    if (!content) {
      return errorResponse(res, 404, 'Program content not found for this program');
    }

    return successResponse(res, 200, 'Program content retrieved successfully', content);
  } catch (error) {
    next(error);
  }
};

export const updateProgramContent = async (req, res, next) => {
  try {
    const { programId } = req.params;
    const content = await programContentService.updateProgramContent(programId, req.body);

    return successResponse(res, 200, 'Program content updated successfully', content);
  } catch (error) {
    next(error);
  }
};

export const deleteProgramContent = async (req, res, next) => {
  try {
    const { programId } = req.params;
    const content = await programContentService.deleteProgramContent(programId);

    return successResponse(res, 200, 'Program content deleted successfully', content);
  } catch (error) {
    next(error);
  }
};

