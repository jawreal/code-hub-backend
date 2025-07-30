import { Router } from 'express';
import { getInfo, uploadPost } from '../controllers/api.controller'
const router = Router();

router.get('/get-info/:username', getInfo);
router.post('/upload-post', uploadPost);

export default router;