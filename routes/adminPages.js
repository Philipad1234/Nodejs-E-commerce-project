const express = require('express');
const router = express.Router();


// GET Page model
let Page = require('../models/page')

// GET index page
router.get('/', function (req, res) {
    res.send('admin area')
});


// GET add page
router.get('/add-page', function (req, res) {

    let title = '';
    let slug = '';
    let content = '';

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })

})


// POST add page
router.post('/add-page', function (req, res) {

    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();

    let title = req.body.title;
    let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();
    const content = req.body.content;

    const errors = req.validationErrors();
    if (errors) {
        res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        })
    } else {
        Page.findOne({slug:slug}, function(err, page){
            if(page){
                req.flash('danger', 'Page slug exists, choose another!');
                res.render('admin/add_page', {
                    title: title,
                    slug: slug,
                    content: content
                })
            }else{
                let page = new Page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 0
                });
                page.save(function(err){
                    if(err) return console.log(err);
                    req.flash('success', 'Page Added!');
                    res.redirect('/admin/pages')
                })
            }
        })
    }


});



// Exports
module.exports = router;