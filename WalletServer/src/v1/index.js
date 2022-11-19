import { Router } from 'express';
import * as signController from '../controllers/signController.js'

const router = Router();

router.get("/sign", signController.getSignature);

router.get("/verify", signController.getVerification);

export default router;