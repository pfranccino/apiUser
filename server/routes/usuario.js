const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario')



app.get('/usuarios', function(req, res) {


    Usuario.find({ estado: true }).exec((err, resp) => {

        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            usuarios: resp
        })

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


app.put('/usuarios/:id', function(req, res) {
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


app.delete('/usuarios/:id', function(req, res) {

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


app.get('/usuarios/:id', function(req, res) {

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