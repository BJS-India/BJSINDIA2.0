import express from 'express';
import {
  createProgramContent,
  getContentByProgramId,
  updateProgramContent,
  deleteProgramContent,
} from '../controllers/programContentController.js';

const router = express.Router();

router.post('/', createProgramContent);
router.get('/:programId', getContentByProgramId);
router.put('/:programId', updateProgramContent);
router.delete('/:programId', deleteProgramContent);

export default router;

