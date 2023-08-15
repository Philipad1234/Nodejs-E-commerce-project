const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.send('admin area')
});

router.get('/add-page', function (req, res) {

    const title= "";
    const slug= "";
    const content= "";
    
    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
});



// Exports
module.exports = router;