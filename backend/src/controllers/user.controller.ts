import * as express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import path from 'path';

export class UserController { 

    login = async (req: express.Request, res: express.Response) => { 
        const { username, password, type } = req.body;

        try {
            const user = await User.findOne({ username, type, status: 'aktivan' });
            if (!user){  
                res.json(null);
                return
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match){
                res.json(null);
                return;
            }

            res.json(user);
        } 

        catch(err){
            console.error(err);
            
            res.json(null);
        }
    };

     getVlasnici= (req: express.Request, res: express.Response)=>{
        User.find({'type': "vlasnik", 'status' :'aktivan'}).then((users)=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    getTuristi= (req: express.Request, res: express.Response)=>{
        User.find({'type':"turista", 'status' :'aktivan'}).then((users)=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    getZahtevi=(req: express.Request, res: express.Response)=>{
        User.find({'status' :'neaktivan'}).then((users)=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }


    register = async (req: express.Request, res: express.Response) => {
        let rounds = 10
        let cryptedPassword = await bcrypt.hash(req.body.password, rounds)
         let newUser = new User({
                    username: req.body.username,
                    password: cryptedPassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    creditCard: req.body.creditCard,
                    gender: req.body.gender,
                    address: req.body.address,
                    email: req.body.email,
                    phone: req.body.phone,
                    profileImage: req.body.profileImage,
                    status:req.body.status,
                    type: req.body.type
                })
        newUser.save()
            .then(() => res.send("Uspesno dodat korisnik"))
            .catch((err: any) => {
                console.log(err);
                res.send("Neuspesno dodat korisnik");            });
    }
 async changePassword(req: express.Request, res: express.Response): Promise<void> {
    const { username, oldPassword, newPassword } = req.body;
    const rounds = 10;

    try {
        const user = await User.findOne({ username });
        if (!user){
            res.json("Korisnik nije pronađen");
            return;
        }
        
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect){
            res.json("Stara lozinka nije tačna");
            return;
        }
        
        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame){
            res.json("Nova lozinka ne sme biti ista kao stara");
            return;
        }
        
        const cryptedPassword = await bcrypt.hash(newPassword, rounds);
        await User.updateOne({ username }, { $set: { password: cryptedPassword } });
        res.json("Lozinka uspešno promenjena");
    } catch (err) {
        console.error(err);
        res.json("Greška prilikom promene lozinke");
    }
}

    edit(req: express.Request, res: express.Response){
        let username=req.body.username;
        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        let phone=req.body.phone;
        let address=req.body.address;
        let profileImage=req.body.profileImage;
        User.updateOne({'username':username}, {$set:{'firstName':firstName,'lastName':lastName,'email':email,'phone':phone,'address':address,'profileImage':profileImage}}).then(() => res.send("Uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.send("Neuspesno");
        });
    }

    prihvatiZahtev(req: express.Request, res: express.Response){
        let username=req.body.username;
        User.updateOne({'username':username}, {$set:{'status':"aktivan"}}).then(() => res.json("Uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.json("Neuspesno");
        });
    }
    odbijZahtev(req: express.Request, res: express.Response){
        let username=req.body.username;
        User.deleteOne({'username':username},{$set:{'status':"odbijen"}}).then(() => res.json("Uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.json("Neuspesno");
        });
    }
    deaktivirajKorisnika(req: express.Request, res: express.Response){
        let username=req.body.username;
        User.updateOne({'username':username}, {$set:{'status':"deaktiviran"}}).then(() => res.json("Uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.json("Neuspesno");
        });
    }
    obrisiKorisnika(req: express.Request, res: express.Response){
        let username=req.params.username;
        User.deleteOne({'username':username}).then(() => res.json("Uspesno"))
        .catch((err:any)=>{
                console.log(err);
                res.json("Neuspesno");
        });
    }
}