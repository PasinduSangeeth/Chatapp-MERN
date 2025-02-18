import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
const router =express.router();

router.get('/users',protectRoute,getUsersForSidebar);

export default router;