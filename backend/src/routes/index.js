import express from 'express';
import * as userController from '../controllers/userControllers';
import * as doctorController from '../controllers/doctorControllers';
import validate from '../handlers/validation';
import { SaveUser } from '../middlewares/validators';
import isLoggedIn from '../middlewares/auth';






const router = express.Router();


router.get('/', (req, res) => {
    res.json({ message: 'Hello router' });
});


// User Routes
router.post('/account/signup', validate(SaveUser), userController.register)
router.post('/account/signin', userController.login);
router.get('/account/me', isLoggedIn, userController.me);
router.get('/account/profile', isLoggedIn, userController.getProfile)

// Doctors Routes
router.get('/doctors', doctorController.index);

export default router;