const express = require('express')
const ContentChangeRequest = require('./../Models/ContentChangeRequest')
const contentChangeRequestRouter = express.Router()

contentChangeRequestRouter.route('/')
    .get((req, res) => {
        ContentChangeRequest.find()
            .then((changeRequests) => {
                res.json(changeRequests)
            })  
    })
    .post((req, res) => {
        const changeRequest = new ContentChangeRequest(req.query);
        changeRequest.save();
        res.status(201).send(changeRequest)
    }) 

contentChangeRequestRouter.route('/:id')
    .get((req, res) => {
        ContentChangeRequest.find({ _id: req.params.id })
            .then((changeRequests) => {
                res.json(changeRequests)
            })  
    }) 
    .put((req, res) => {
        ContentChangeRequest
            .findOneAndUpdate(req.params.id, req.query, {upsert:true}, (err, doc) => {
                if (err) return res.send(500, { error: err });
                res.json(doc)
            })
    }) 
    .delete((req, res) => {
        ContentChangeRequest
            .findById(req.params.id)
            .then((changeRequest) => {
                if (!changeRequest) {
                    res.status(500).json({
                        success: false,
                        message: `Request not found ${req.params.id}`,
                        error: err
                    })
                    return true
                }

                changeRequest.remove(err => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: err
                        })
                    } else {
                        res.status(201).json({
                            success: true
                        })
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message,
                    error: err
                })
            })
    }) 

module.exports = contentChangeRequestRouter