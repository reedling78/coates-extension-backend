const express = require('express')
const DigitalWhiteboardModel = require('./../models/DigitalWhiteboard')
const digitalWhiteboardRouter = express.Router()

digitalWhiteboardRouter.route('/')

    .get((req, res) => {
        DigitalWhiteboardModel.find()
            .then((digitalWhiteboard) => {
                res.json(digitalWhiteboard)
            })  
            .catch(err => {
                console.log(err)
            })
    })

    .post((req, res) => {
        const starndVal = JSON.stringify(req.body)
        const patt = RegExp(/\[(.+)\]/gm)
        const match = patt.exec(starndVal)
        const data = JSON.parse(`[${match[1].replace(/\\/g, '')}]`)
     
        DigitalWhiteboardModel.find({})
            .remove()
            .then((d) => {
                DigitalWhiteboardModel.insertMany(data).then(e => {
                    res.json(e)
                })
            })
        
    })

    .delete((req, res) => {
        DigitalWhiteboardModel.find({})
            .remove()
            .then((d) => {
                res.json(d)
            })
    })

digitalWhiteboardRouter.route('/:id')

    .get((req, res) => {
        res.json({})
    }) 

    .put((req, res) => {
        res.json({})
    })

    .delete((req, res) => {
        res.json({})
    }) 

module.exports = digitalWhiteboardRouter

