let express = require('express');
const flash = require('express-flash');
let router = express.Router();
let dbConn = require('../lib/db')

// display book  page

router.get('/', (req, res, next) => {
    dbConn.query('SELECT * FROM books ORDER BY id desc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('books', {data: ''});
        } else {
            res.render('books', {data: rows });
        }
    })

})

// display add book page

router.get('/add', (req, res, next) =>  {
    res.render('books/add', {
        name: '',
        author: ''
    })
})

// add new book
router.post('/add',  (req, res, next) => {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;
        // set flash messsage
        req.flash('error', 'Please enter name and author');
        //render to add.ejs with flash message

        res.render('books/add', {
            name: name,
            author: author
        })
    }
})

module.exports = router;
