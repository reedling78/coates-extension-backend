const express = require('express')
const ContentChangeRequest = require('./../models/ContentChangeRequest')
const contentChangeRequestRouter = express.Router()

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

contentChangeRequestRouter.route('/')

    .get((req, res) => {
        ContentChangeRequest.find()
            .then((changeRequests) => {
                res.json(changeRequests)
            })  
            .catch(err => {
                console.log(err)
            })
    })

    .post((req, res) => {
        const dataValid = (
            req.body.name &&
            req.body.email &&
            validateEmail(req.body.email)
        )

        if (!dataValid) {
            res.status(400);
            res.json({message: "Bad Request"});
        } else {
            const changeRequest = new ContentChangeRequest(req.body);
            changeRequest.save();
            res.send(changeRequest)
        }
    })

contentChangeRequestRouter.route('/:id')

    .get((req, res) => {
        ContentChangeRequest.find({ _id: req.params.id })
            .then((changeRequests) => {
                res.json(changeRequests)
            })  
            .catch(err => {
                res.status(404);
                res.json({
                    message: 'Not found'
                });
            })
    }) 

    .put((req, res) => {

        console.log(req.body)

        ContentChangeRequest
            .findOneAndUpdate(req.params.id, req.body, { upsert:true }, (err, doc) => {
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