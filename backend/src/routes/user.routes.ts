import express from 'express';
import { UserController } from '../controllers/user.controller';
import user from '../models/user';
import { AdminControler } from '../controllers/admin.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);
userRouter.route('/adminlogin').post(
    (req,res) => new AdminControler().login(req,res)
);
userRouter.route('/getVlasnici').get(
    (req,res)=> new UserController().getVlasnici(req,res)
);
userRouter.route('/getTuristi').get(
    (req,res)=> new UserController().getTuristi(req,res)
);
userRouter.route('/getZahtevi').get(
    (req,res)=> new UserController().getZahtevi(req,res)
);
userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);
userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)
userRouter.route('/edit').post(
    (req, res)=>new UserController().edit(req, res)
)
userRouter.route('/prihvatiZahtev').post(
    (req, res)=>new UserController().prihvatiZahtev(req, res)
)
userRouter.route('/odbijZahtev').post(
    (req, res)=>new UserController().odbijZahtev(req, res)
)
userRouter.route('/deaktivirajKorisnika').post(
    (req, res) => new UserController().deaktivirajKorisnika(req, res)
);
userRouter.route('/obrisiKorisnika/:username').delete(
    (req, res) => new UserController().obrisiKorisnika(req, res)
)
export default userRouter;

