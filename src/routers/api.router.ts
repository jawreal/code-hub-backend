import { Router } from 'express';
import { getInfo } from '../controllers/api.controller'
const router = Router();

router.get('/get-info/:username', getInfo);

export default router;