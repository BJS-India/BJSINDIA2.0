import * as basketService from '../services/basketService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const createBasket = async (req, res, next) => {
  try {
    const basket = await basketService.createBasket(req.body);
    return successResponse(res, 201, 'Basket created successfully', basket);
  } catch (error) {
    next(error);
  }
};

export const getAllBaskets = async (req, res, next) => {
  try {
    const { search, status, sortBy, sortOrder, includePrograms } = req.query;
    const baskets = await basketService.getAllBaskets({
      search,
      status,
      sortBy,
      sortOrder,
      includePrograms,
    });
    return successResponse(res, 200, 'Baskets retrieved successfully', baskets);
  } catch (error) {
    next(error);
  }
};

export const getBasketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includePrograms } = req.query;
    const basket = await basketService.getBasketById(id, { includePrograms });

    if (!basket) {
      return errorResponse(res, 404, 'Basket not found');
    }

    return successResponse(res, 200, 'Basket details retrieved successfully', basket);
  } catch (error) {
    next(error);
  }
};

export const updateBasket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const basket = await basketService.updateBasket(id, req.body);

    if (!basket) {
      return errorResponse(res, 404, 'Basket not found');
    }

    return successResponse(res, 200, 'Basket updated successfully', basket);
  } catch (error) {
    next(error);
  }
};

export const deleteBasket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const basket = await basketService.deleteBasket(id);

    if (!basket) {
      return errorResponse(res, 404, 'Basket not found');
    }

    return successResponse(res, 200, 'Basket deleted successfully', basket);
  } catch (error) {
    next(error);
  }
};

