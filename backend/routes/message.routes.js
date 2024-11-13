import { Router } from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = Router();

router.get('/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
