import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateMiddleware";
import { loginValidator, registerValidator } from "../validators/authValidators";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.get("/me", protect, getMe);

export default router;