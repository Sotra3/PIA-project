import express from 'express';
import { VikendiceController } from '../controllers/vikendice.controller';

const vikendiceRouter = express.Router();

vikendiceRouter.route('/getVikendice').get(
    (req, res) => new VikendiceController().getVikendice(req, res)
);
vikendiceRouter.route('/getOneVikendica/:ime').get(
    (req, res) => new VikendiceController().getOneVikendica(req, res)
)
vikendiceRouter.route('/getMestoVikendica/:ime').get(
    (req, res) => new VikendiceController().getMestoVikendica(req, res)
)
vikendiceRouter.route('/addVikendica').post(
    (req, res) => new VikendiceController().addVikendica(req, res)
)
vikendiceRouter.route('/getMojeVikendice/:username').get(
    (req, res) => new VikendiceController().getMojeVikendice(req, res)
)
vikendiceRouter.route('/deleteVikendica/:id').delete(
    (req, res) => new VikendiceController().deleteVikendica(req, res)
)
vikendiceRouter.route('/editVikendica').post(
    (req, res) => new VikendiceController().editVikendica(req, res)
)
vikendiceRouter.route('/updateVikendica').post(
    (req, res) => new VikendiceController().updateVikendica(req, res)
)
export default vikendiceRouter;