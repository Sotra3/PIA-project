import * as express from 'express';
import User from '../models/user';

export class AdminControler {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = "admin"

        User.findOne({ 'username': username, 'password': password, 'type': type }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }
    }