const express = require('express')
const router = new express.Router()
const yup = require('yup')
const schema = require('../model/schema.ts')
const {nanoid} = require('nanoid')
const urls = require('../database/database.ts')



// Redirecting a URL 
router.get('/:id', async (req, res) => {
    const { id: shortit} = req.params;
    try {
        const url = await urls.findOne({shortit})
        if (url) {
            res.redirect(url.url)
        }
        res.redirect(`/?error=${shortit} not found`)
    } catch (e){
        res.redirect(`/?error=${shortit} not found`)
    }
})

//Create a short url 
router.post('/url', async (req, res, next) => {
    let {shortit, url} = req.body
    try {
        await schema.validate({
            url,
            shortit,
        });
        if (!shortit){
            shortit = nanoid(8);
        }else {
            const existing = await urls.findOne({shortit});
            if (existing)
                throw new Error('Slug in use')
        }
        shortit = shortit.toLowerCase();
        const secret = nanoid(10).toLowerCase()
        const newUrl = {
            url,
            shortit,
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