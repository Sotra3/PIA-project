import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Rezervacije = new Schema({
        datumOd:{
            type: Date,
            required: true
        },
        datumDo:{
            type: Date,
            required: true
        },
        brojOdraslih:{
            type: Number,
            required: true
        },
        brojDece:{
            type: Number,
        },
        zahtevi:{
            type: String,
        },
        korisnik:{
            type: String,
            required: true
        },
        vikendicaIme:{
            type: String,
            required: true
        },
        vikendicaMesto:{
            type: String,
            required: true
        },
        vikendicaVlasnik:{
            type: String,
            required: true
        },
        vikendicaId:{
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        datumRezervacje:{
            type: Date,
            required: true
        },
        komentarVlasnika:{
            type:String
        }
    }
)

export default mongoose.model('Rezervacije', Rezervacije, 'rezervacije');
