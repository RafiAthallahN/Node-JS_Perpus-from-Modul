const { //mengatur jalan/rute pd aplikasi berbasis web
    controllerAdd, //menentukan alamat API
    controllerGet, //controller dipanggil di router (disini)
    controllerGetId,
    controllerUpdate,
    controllerDelete
} = require('./anggota.controller');
const router = require('express').Router();
const {
    checkToken
} = require("../../auth/token_validation")

router.post('/', checkToken, controllerAdd); //CHECKTOKEN : untuk bisa ngakses controller, harus punya token dulu
router.get('/', checkToken, controllerGet);
router.get('/id', checkToken, controllerGetId);
router.patch('/', checkToken, controllerUpdate);
router.delete('/', checkToken, controllerDelete);

module.exports = router;