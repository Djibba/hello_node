const multer = require('multer');

const {
    UserController,
    LocationController,
    SublocationController
} = require('./../controller');

const LivreController = require('./../controller/livre');

const { auth } = require('./../middlewares');
const { auth_non_active } = require('./../middlewares');

module.exports = (app) => {
    // End Users
    app.post('/user', UserController.create);
    app.get('/user', auth, UserController.get);
    app.get('/user/refresh_token', auth, UserController.refreshToken);
    app.post('/user/verify_code', auth_non_active, UserController.verifyCode);
    app.get('/user/init', UserController.seedUsers);

    //End Livre
    app.post('/livre', LivreController.createLivre);
    app.get('/livres', LivreController.showLivre);
    app.get('/livre/:id', LivreController.getOneLivre);
    app.put('/livre/edit/:id', LivreController.updateLivre);
    app.delete('/livre/delete/:id', LivreController.deleteLivre);
};