import { Request, Response, Router } from "express";
import healthRouter  from './health.router';
import studentsRouter from './studentes.router';

const router = Router();

router.use('/health',  healthRouter);
router.use('/students', studentsRouter);

export default router;