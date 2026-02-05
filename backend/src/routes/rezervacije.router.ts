import express from 'express';
import { RezervacijeController } from '../controllers/rezervacje.controller';

const rezervacijeRouter = express.Router();

rezervacijeRouter.route('/proveraRezervacije').post(
    (req, res) => new RezervacijeController().proveraRezervacije(req, res)
);
rezervacijeRouter.route('/rezervisi').post(
    (req, res) => new RezervacijeController().rezervisi(req, res)
)
rezervacijeRouter.route('/allRezervacije/:username').get(
    (req, res) => new RezervacijeController().allRezervacije(req, res)
)
rezervacijeRouter.route('/allNeobradjeneRezervacije/:username').get(
    (req, res) => new RezervacijeController().allNeobradjeneRezervacije(req, res)
)
rezervacijeRouter.route('/odbijRezervaciju').post(
    (req, res) => new RezervacijeController().odbijRezervaciju(req, res)
)
rezervacijeRouter.route('/potvrdiRezervaciju').post(
    (req, res) => new RezervacijeController().potvrdiRezervaciju(req, res)
)
rezervacijeRouter.route('/getLast24').get(
    (req, res) => new RezervacijeController().getLast24(req, res)
)
rezervacijeRouter.route('/getLast30').get(
    (req, res) => new RezervacijeController().getLast30(req, res)
)
rezervacijeRouter.route('/getLast7').get(
    (req, res) => new RezervacijeController().getLast7(req, res)
)
rezervacijeRouter.route('getRezervacija/:id').get(
    (req, res) => new RezervacijeController().getRezervacija(req, res)
)
export default rezervacijeRouter;