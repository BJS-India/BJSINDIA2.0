import * as programService from '../services/programService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const createProgram = async (req, res, next) => {
  try {
    const program = await programService.createProgram(req.body);
    return successResponse(res, 201, 'Program created successfully', program);
  } catch (error) {
    next(error);
  }
};

export const getAllPrograms = async (req, res, next) => {
  try {
    const { search, status, basketId, sortBy, sortOrder, includeContent } = req.query;
    console.log("query ", req.query)
    const programs = await programService.getAllPrograms({
      search,
      status,
      basketId,
      sortBy,
      sortOrder,
      includeContent,
    });
    return successResponse(res, 200, 'Programs retrieved successfully', programs);
  } catch (error) {
    next(error);
  }
};

export const getProgramById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includeContent } = req.query;
    const program = await programService.getProgramById(id, { includeContent });

    if (!program) {
      return errorResponse(res, 404, 'Program not found');
    }

    return successResponse(res, 200, 'Program details retrieved successfully', program);
  } catch (error) {
    next(error);
  }
};

export const getProgramsByBasket = async (req, res, next) => {
  try {
    const { basketId } = req.params;
    const { search, status, sortBy, sortOrder } = req.query;
    const programs = await programService.getProgramsByBasketId(basketId, {
      search,
      status,
      sortBy,
      sortOrder,
    });
    return successResponse(res, 200, 'Programs retrieved successfully for basket', programs);
  } catch (error) {
    next(error);
  }
};

export const updateProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await programService.updateProgram(id, req.body);

    if (!program) {
      return errorResponse(res, 404, 'Program not found');
    }

    return successResponse(res, 200, 'Program updated successfully', program);
  } catch (error) {
    next(error);
  }
};

export const moveProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBasketId = req.body.basketId || req.body.targetBasketId;
    const program = await programService.moveProgram(id, newBasketId);

    return successResponse(res, 200, 'Program moved to new basket successfully', program);
  } catch (error) {
    next(error);
  }
};

export const deleteProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await programService.deleteProgram(id);

    if (!program) {
      return errorResponse(res, 404, 'Program not found');
    }

    return successResponse(res, 200, 'Program deleted successfully', program);
  } catch (error) {
    next(error);
  }
};

