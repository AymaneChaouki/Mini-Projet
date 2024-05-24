import {Schema, model} from 'mongoose';

const empruntSchema = new Schema({
    clientId: {type: String, required: true},
    livreId: {type: String, required: true},
    dateEmprunt: {type: Date, required: true},
    dateRetour: {type: Date, required: true},
    dateRetourPrevue: {type: Date, required: true}

})