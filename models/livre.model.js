const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const livreSchema = new Schema({

    titre: {
        type: String,
        required: true 
    },

    auteur: {
        type: String,
        required: true
    },

    editeur: {
        type: String,
        required: true
    },

    anneepub: {
        type: String,
        required: true
    }

});

const LIVRE = mongoose.model("livre", livreSchema);

module.exports = LIVRE;