const jwt = require('jsonwebtoken');


let tokenValidator = (req, res, next) => {


    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {


        if (err) {
            return res.status(401).json({
                ok: false,
                error: 'Token no valido'
            });
        }

        req.usuario = decoded.usuario
        next();

    });

}



let roleValidator = (req, res, next) => {


    let usuario = req.usuario

    if (usuario.role === 'ADMIN') {

        next();
    } else {

        return res.json({
            ok: false,
            error: 'No es admin'
        });
    }
}


module.exports = {

    roleValidator,
    tokenValidator

}