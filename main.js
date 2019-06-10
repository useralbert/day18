const hbs = require('express-handlebars')
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const request = require('request');
const cookieParser = require('cookie-parser');

const config = require('./config.json');

const SQL_SELECT_BGG_GAME = "select * from employees limit ? offset ?";
const SQL_SELECT_BGG_GAME_BY_NAME = "select name from game";

//const Pool = mysql.createPool(config.bgg)
const pool = mysql.createPool(require('./config.json'));

const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

const app = express();

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/search', (req, resp) => {
    const q = req.body.q;
    //const cart = JSON.parse(req.body.cart);
    pool.getConnection((err, conn) => {
        if (err) {
            resp.status(500);
            resp.type('text/plain');
            resp.send(err);
            return;
        }
        //Perform our query
        //conn.query(SQL_SELECT_FILM, //(err, result) => {
        //conn.query(SQL_SELECT_FILM_WHERE, 
        conn.query(SQL_SELECT_BGG_GAME_BY_NAME,
            [ ],
            (err, result) => {
            //Release the connection
                conn.release();
                console.info(result);
                console.info(typeof result[1]);
                if (err) {
                    resp.status(500);
                    resp.type('text/plain');
                    resp.send(err);
                    return;
                }
                resp.status(200);
                resp.type('text/html');
                resp.render('games', { 
                    name: name, 
                    result: result,
                    q: q,
                    noResult: result.length <= 0,
                    layout: false 
                });
            }
        )
    });
})

 /*   resp.status(200)
    resp.type('text/html')
    resp.render('search', { 
        name: name,
        cart: JSON.stringify(cart),
        items: cart,
        layout: false
    }) */



app.get('/search', (req, resp) => {
    const q = req.query.q;
    pool.getConnection((err, conn) => {
        if (err) {
            resp.status(500);
            resp.type('text/plain');
            resp.send(err);
            return;
        }
        //Perform our query
        //conn.query(SQL_SELECT_FILM, //(err, result) => {
        //conn.query(SQL_SELECT_FILM_WHERE, 
        conn.query(SQL_SELECT_BGG_GAME_BY_NAME,
            [ ],
            (err, result) => {
            //Release the connection
                conn.release();
                console.info(result);
                console.info(typeof result[1]);
                if (err) {
                    resp.status(500);
                    resp.type('text/plain');
                    resp.send(err);
                    return;
                }
                resp.status(200);
                resp.type('text/html');
                resp.render('games', { 
                    name: name, 
                    result: result,
                    q: q,
                    noResult: result.length <= 0,
                    layout: false 
                });
            }
        )
    });
})


















app.get(/.*/, express.static(__dirname + '/public'));

app.listen(PORT, () => {
	console.info(`Application started at ${new Date()} on port ${PORT}`);
});
