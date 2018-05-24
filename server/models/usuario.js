const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: 'rol no valido'
}

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'Campo requerido']
    },

    email: {
        type: String,
        required: [true, 'Campo requerido'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Campo requerido']
    },

    img: {
        type: String,

    },

    roles: {
        type: String,
        default: 'USER',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});


usuarioSchema.methods.toJSON = function() {

    let usuario = this
    let usuarioObject = usuario.toObject()
    delete usuarioObject.password

    return usuarioObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);