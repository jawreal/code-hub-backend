import '../auth/passport.config'
import { Router } from 'express';
import { checkAuth, signout } from '../controllers/auth.controller';
import { googleCallback, githubCallback } from '../auth/passport.callback';
import { googleAuth, githubAuth } from '../auth/passport.auth'

const router = Router();

router.get('/verify-user', checkAuth);
router.get('/google/callback', googleCallback);
router.get('/github/callback', githubCallback);
router.get('/google/sign-in', googleAuth);
router.get('/github/sign-in', githubAuth);
router.get('/sign-out', signout);
export default router;