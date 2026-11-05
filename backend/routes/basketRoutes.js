import express from 'express';
import {
  createBasket,
  getAllBaskets,
  getBasketById,
  updateBasket,
  deleteBasket,
} from '../controllers/basketController.js';
import { getProgramsByBasket } from '../controllers/programController.js';

const router = express.Router();

// Basket routes
router.post('/', createBasket);
router.get('/', getAllBaskets);
router.get('/:id', getBasketById);
router.put('/:id', updateBasket);
router.delete('/:id', deleteBasket);

// Nested route: Get all programs belonging to a specific basket
router.get('/:basketId/programs', getProgramsByBasket);

export default router;

