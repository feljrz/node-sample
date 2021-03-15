import { Router } from 'express'
import { UserController }  from './controllers/UserController'

const router = Router();
const userController = new UserController();

router.post('/users', userController.create)
router.delete('/users', userController.delete)


export { router }
