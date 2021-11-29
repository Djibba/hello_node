const { render } = require('ejs');
const mongoose = require('mongoose');
let Livre = require('../models/livre.model');
const LIVRE = mongoose.model('livre');




module.exports = {

    /** Creating livre by genrating first an otp and jwt token
     * @param  {} req
     * @param  {} res
     */

    /**
     * @api {post} /livre Add livre the database
     * @apiName CreateLivre
     * @apiGroup Livre
     *
     * @apiHeader {String} token application
     *
     * @apiParam {String} title explication de title
     * @apiParam {String} edition explication de edition
     * @apiParam {String} author explication de author
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Livre} livre le livre creer
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully created.",
     *       "idLivre": "6cfb320a-bc39-48a6-b49f-3277646ad1d5",
     *       "token": {
     *         "token": "xxx",
     *         "expiresIn": 86400,
     *         "createdAt": "2020-04-28T17:57:22.114Z"
     *       }
     *     }
     */

    async creerLivre(req, res) {

        try {
            console.log(req.body);
            const livre = new Livre({
                titre: req.body.titre,
                auteur: req.body.auteur,
                editeur: req.body.editeur,
                anneepub: req.body.anneepub
            });


            livre.save().then((result) => {
                res.status(201).send({
                    success: true,
                    message: 'Successfully created.',
                    livre: result
                });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);

        }
    },

    async listerLivre(req, res) {
        Livre.find().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
    },

    getOneLivre(req, res) {

        Livre.findById(req.params.id, (err, data) => {
            if (err) console.log(err)
            res.send(data)
        })

    },

    updateLivre(req, res) {
        const livre = {
            titre: req.body.titre,
            auteur: req.body.auteur,
            editeur: req.body.editeur,
            anneepub: req.body.anneepub
        }

        Livre.findByIdAndUpdate(req.params.id, { $set: livre }, { new: true }, (err, data) => {
            if (err) console.log(err)
            res.status(201).send({
                success: true,
                message: 'Successfully updated.',
                livre: data
            });
        })
    },

    deleteLivre(req, res) {
        Livre.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) console.log(err)
            res.status(202).send({
                success: true,
                message: 'Successfully deleted.',
                livre: data
            });
        })
    }
};