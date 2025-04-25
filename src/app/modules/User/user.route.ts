import express from "express";
const router = express.Router();

import { UserController } from "./user.controller";

// router.get('/', UserController.getAll);
// router.get('/:id', UserController.getOne);
router.post("/", UserController.createUser);
// router.put('/:id', UserController.update);
// router.delete('/:id', UserController.delete);

export const userRoutes = router;
