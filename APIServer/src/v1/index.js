import { Router } from 'express';
import * as priceController from '../controllers/priceController.js'
import * as signController from '../controllers/signController.js'

const router = Router();

router.get("/price/:tokenId", priceController.getPrice);

router.get("/sign", signController.getSignature);

router.get("/verify", signController.getVerification);

export default router;