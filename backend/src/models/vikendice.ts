import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Vikendice = new Schema({
        ime:{
            type: String,
            required: true
        },
        mesto:{
            type: String,
            required: true
        },
        usluge:{
            type: String,
            required: true
        },
        cenovnik:{
            letnji:{
                type: Number,
                required: true
            },
            zimski:{
                type: Number,
                required: true
            }
        },
        telefon:{
            type: String,
            required: true
        },
        koordinate:{
            x:{
                type: Number,
                required: true
            },
            y:{
                type: Number,
                required: true
            }
        },
        ocene:{
            type: Array,
        },
        slike:{
            type: Array,
        },
        komentari:{
            type: Array,
        },
        vlasnik:{
            type: String,
            required: true
        }   
    }
)

export default mongoose.model('Vikendice', Vikendice, 'vikendice');
