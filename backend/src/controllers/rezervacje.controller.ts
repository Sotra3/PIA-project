import Rezervacije from '../models/rezervacije';
import * as express from 'express';

export class RezervacijeController {
    proveraRezervacije = (req: express.Request, res: express.Response) => {
        const { vikendica, datumOd, datumDo } = req.body;
        Rezervacije.find({
            vikendicaIme: vikendica,
            status:{$ne:"odbijena"},
            $or: [
                { datumOd: { $lte: new Date(datumOd) }, datumDo: { $gt: new Date(datumOd) } },
                { datumOd: { $lt: new Date(datumDo) }, datumDo: { $gte: new Date(datumDo) } },
                { datumOd: { $gte: new Date(datumOd) }, datumDo: { $lte: new Date(datumDo) } }
            ]
        }).then(rezervacije => {
            const status = rezervacije.length == 0 ? "dostupna" : "nedostupna";
            res.json(status);
        }).catch(err => {
            res.json("nedostupna");
        });
    }
    rezervisi = (req: express.Request, res: express.Response) => {
        const { _id, ...rezervacijaData } = req.body;
        const novaRezervacija = new Rezervacije(rezervacijaData);
        novaRezervacija.save().then((savedRezervacija) => {
            res.json("uspesno");
        }).catch(err => {
            res.json("neuspesno");
        });
    }
    allRezervacije = (req: express.Request, res: express.Response) => {
        const username = req.params.username;
        Rezervacije.find({ korisnik: username, status: "prihvacena" }).then(rezervacije => {
            res.json(rezervacije);
        }).catch(err => {
            res.json("neuspesno");
        });
    }

    allNeobradjeneRezervacije= (req: express.Request, res: express.Response) => {
        const username = req.params.username;
        Rezervacije.find({ vikendicaVlasnik: username, status:"u obradi" }).then(rezervacije => {
            res.json(rezervacije);
        }).catch(err => {
            res.json("neuspesno");
        });
    }
    potvrdiRezervaciju= (req: express.Request, res: express.Response) => {
        const id = req.body.id;
        const komentarVlasnika = req.body.komentarVlasnika;
        Rezervacije.updateOne({ _id: id }, { $set: { status: "prihvacena", komentarVlasnika: komentarVlasnika} }).then(() => {
            res.json("uspesno");
        }).catch(err => {
            res.json("neuspesno");
        });
    }
    odbijRezervaciju= (req: express.Request, res: express.Response) => {
        const id = req.body.id;
        const komentarVlasnika = req.body.komentarVlasnika;
        Rezervacije.updateOne({ _id: id }, { $set: { status: "odbijena", komentarVlasnika: komentarVlasnika} }).then(() => {
            res.json("uspesno");
        }).catch(err => {
            res.json("neuspesno");
        });
    }

    getLast7= (req: express.Request, res: express.Response) => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        Rezervacije.find({datumRezervacje: { $gte: sevenDaysAgo } }).then(rezervacije => {
            res.json(rezervacije.length);
        }).catch(err => {
            res.json("neuspesno");
        });
    }
   
    getLast24= (req: express.Request, res: express.Response) => {
        const currentDate = new Date();
        const twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        Rezervacije.find({ datumRezervacje: { $gte: twentyFourHoursAgo } }).then(rezervacije => {
            res.json(rezervacije.length);
        }).catch(err => {
            res.json("neuspesno");
        });
    }

     getLast30= (req: express.Request, res: express.Response) => {
        const currentDate = new Date();
        const twentyFourHoursAgo = new Date(currentDate.getTime() - 30*24 * 60 * 60 * 1000);
        Rezervacije.find({ datumRezervacje: { $gte: twentyFourHoursAgo } }).then(rezervacije => {
            res.json(rezervacije.length);
        }).catch(err => {
            res.json("neuspesno");
        });
    }

    getRezervacija= (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        Rezervacije.find({ _id: id}).then(rezervacije => {
            res.json(rezervacije);
        }).catch(err => {
            res.json("neuspesno");
        });
    }
}
