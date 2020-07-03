const express = require('express')
const router = new express.Router()
const yup = require('yup')
const schema = require('../model/schema.ts')
const {nanoid} = require('nanoid')
const urls = require('../database/database.ts')

router.use(express.static('./public'))

// Getting A Short URL
router.get('/url/:id', (req, res) => {

})

// Redirecting a URL 
router.get('/:id', async (req, res) => {
    const { id: slug} = req.params;
    try {
        const url = await urls.findOne({slug})
        if (url) {
            res.redirect(url.url)
        }
        res.redirect(`/?error=${slug} not found`)
    } catch (e){
        res.redirect(`/?error=${slug} not found`)
    }
})

//Create a short url 
router.post('/url', async (req, res, next) => {
    let {slug, url} = req.body
    try {
        await schema.validate({
            slug,
            url,
        });
        if (!slug){
            slug = nanoid(8);
        }else {
            const existing = await urls.findOne({slug});
            if (existing)
                throw new Error('Slug in use')
        }
        slug = slug.toLowerCase();
        const secret = nanoid(10).toLowerCase()
        const newUrl = {
            url,
            slug,
        }
        const created = await urls.insert(newUrl);
        res.json(created);
    }catch(error){
        next(error)
    }
})

router.use((error, req, res, next) => {
    if (error.status)
        res.status(error.status)
    else
        res.status(500);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'Working' : error
    })
})

module.exports = router 