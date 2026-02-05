import * as express from 'express';
import Vikendice from '../models/vikendice';
import rezervacije from '../models/rezervacije';

export class VikendiceController {
    getVikendice = (req: express.Request, res: express.Response) => {
        Vikendice.find({}).then(vikendice => {
            res.json(vikendice);
        }).catch(err => {
            console.log(err);
            res.json(null);
        });
    }
    getOneVikendica = (req: express.Request, res: express.Response) => {
        let ime = req.params.ime;
        Vikendice.findOne({ ime: ime }).then(vikendice => {
            res.json(vikendice);
        }).catch(err => {
            console.log(err);
            res.json(null);
        });
    }
    getMestoVikendica =(req:express.Request, res:express.Response)=>{
        let ime=req.params.ime;
        Vikendice.findOne({ime:ime}).then(vikendice=>{
            if(vikendice){
                 res.json(vikendice.mesto);
                 return
            }
            else{
                res.json(null);
            }
        }).catch(err=>{
            console.log(err);
            res.json(null);
        });
    }
    addVikendica =(req:express.Request, res:express.Response)=>{
        let newVikendica=new Vikendice({
            ime:req.body.ime,
            mesto:req.body.mesto,
            usluge:req.body.usluge,
            cenovnik:req.body.cenovnik,
            telefon:req.body.telefon,
            koordinate:req.body.koordinate,
            ocene:req.body.ocene,
            slike:req.body.slike,
            komentari:req.body.komentari,
            vlasnik:req.body.vlasnik
        })
        newVikendica.save()
        .then(() => res.json("uspesno"))
        .catch((err: any) => {
            console.log(err);
            res.json("neuspesno");           
        });
    }
    getMojeVikendice=(req:express.Request, res:express.Response)=>{
        let username=req.params.username;
        Vikendice.find({vlasnik:username}).then(vikendice=>{
            res.json(vikendice);
        }).catch(err=>{
            console.log(err);
            res.json(null);
        });
    }

     deleteVikendica = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        Vikendice.deleteOne({ _id: id }).then(() => {
            res.json("uspesno");
        }).catch(err => {
            res.json("neuspesno");
        });
    }
    editVikendica = (req: express.Request, res: express.Response) => {
    const id = req.body._id;
    const updatedVikendica = req.body;
        Vikendice.findById(id).then(staraVikendica => {
        if (!staraVikendica) {
            res.json("neuspesno");
            return;
        }
                return Vikendice.updateOne({ _id: id }, { $set: updatedVikendica })
            .then(() => {
                return rezervacije.updateMany(
                    { vikendicaIme: staraVikendica.ime },
                    { 
                        $set: { 
                            vikendicaIme: updatedVikendica.ime,
                            vikendicaMesto: updatedVikendica.mesto
                        } 
                    }
                );
            });
    }).then(() => {
        res.json("uspesno");
    }).catch(err => {
        console.log(err);
        res.json("neuspesno");
    });
}
    updateVikendica=(req:express.Request, res:express.Response)=>{
        let id=req.body._id;
        let ime=req.body.ime;
        let mesto=req.body.mesto;
        let usluge=req.body.usluge;
        let cenovnik=req.body.cenovnik;
        let telefon=req.body.telefon;
        let koordinate=req.body.koordinate;
        let ocene=req.body.ocene;
        let slike=req.body.slike;
        let komentari=req.body.komentari;
        let vlasnik=req.body.vlasnik;
        Vikendice.updateOne({_id:id},{$set:{
            mesto:mesto,
            usluge:usluge,
            cenovnik:cenovnik,
            telefon:telefon,
            koordinate:koordinate,
            ocene:ocene,
            slike:slike,
            komentari:komentari,
            vlasnik:vlasnik
        }}).then(() => res.json("uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.json("neuspesno");
        });
    }
}