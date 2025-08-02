import { Router } from 'express';
import { getInfo, uploadPost, getPost, viewPost } from '../controllers/api.controller'
const router = Router();

router.get('/get-info/:username', getInfo);
router.post('/upload-post', uploadPost);
router.get('/get-post', getPost);
router.get('/view-post/:postId', viewPost);

export default router;