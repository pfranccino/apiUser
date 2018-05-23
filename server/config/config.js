process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



mongodb: //

    let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb: //localhost:27017/cafe';
} else {
    urlDB = 'mongodb://user:pA245005@ds259778.mlab.com:59778/cafe'
}