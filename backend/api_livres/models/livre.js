import {Schema, model} from 'mongoose';

const livreSchema = new Schema({
    code: String,
    titre: String,
    auteur: String,
    description: String,

});

export default model('Livre', livreSchema)