import { Router } from 'express';
import { getAppointments, createAppointment } from '../controllers/appointmentController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth); // Protect all routes below

router.get('/', getAppointments);
router.post('/', createAppointment);

export default router;
