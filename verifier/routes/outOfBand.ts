import express from 'express';

import { getInvitation } from '../controllers/outOfBand';

const router = express.Router();

router.route('/invitation').get(getInvitation);

export default router;
