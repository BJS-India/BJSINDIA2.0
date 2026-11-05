import express from 'express';
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  moveProgram,
  deleteProgram,
} from '../controllers/programController.js';

const router = express.Router();

router.post('/', createProgram);
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.patch('/:id/move', moveProgram);
router.delete('/:id', deleteProgram);

export default router;