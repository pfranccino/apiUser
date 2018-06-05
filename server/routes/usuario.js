const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario')

const { roleValidator, tokenValidator } = require('../middlewares/autentication')


app.get('/usuarios', tokenValidator, function(req, res) {



    Usuario.find({ estado: true }).exec((err, usuarios) => {

        if (err) {
            return res.status(400).json({
                err
            })
        }

        Usuario.count({ estado: true }, (err, count) => {

            res.json({
                items: count,
                usuarios: usuarios
            });

        });

    });
});



app.post('/usuarios', function(req, res) {

    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        roles: body.roles

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json({
            usuario
        });

    });


});


app.put('/usuarios/:id', tokenValidator, function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'estado', 'img'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioUpdate) => {
        if (err) {

            return res.status(400).json({
                err
            })
        }

        res.json({
            usuario: usuarioUpdate
        })
    });
});


app.delete('/usuarios/:id', tokenValidator, function(req, res) {

    let id = req.params.id;

    let changeState = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, changeState, { new: true }, (err, usuarioUpdate) => {

        if (err) {
            return res.status(400).json({
                err
            })
        } else {

            if (!usuarioUpdate.estado) {
                res.json({
                    err: {
                        message: 'Usuario ya esta deshabilitado'
                    }
                })
            }
        }


    });



});


app.get('/usuarios/:id', tokenValidator, function(req, res) {

    let id = req.params.id
    console.log(id)

    Usuario.findById(id).exec((err, resp) => {

        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            usuario: resp
        })

    });

});



module.exports = app;