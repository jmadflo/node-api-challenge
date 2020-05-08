const express = require('express')
const actionData = require('../data/helpers/actionModel')

const router = express.Router()

// gets all actions
router.get('/', (req, res) => {
    actionData.get()
        .then(allActions => {
            // returns all actions
            res.status(200).json(allActions)
        })
        .catch(() =>{
            res.status(500).json({ message: 'The actions could not be retrieved from the database.' })
        })
})

// middleware

function validateActionId(req, res, next) {
    // get action with the params id and assign it to req.action, otherwise return a 400 error
    actionData.get(req.params.id)
        .then(action => {
            req.action = action
            next()
        })
        .catch(() => {
            res.status(400).json({ message: "invalid action id" })
        })
  }
  
  function validateAction(req, res, next) {
    // send 400 error if req.body is missing or if req.body.description or notes is missing
    if (!req.body){
        res.status(400).json({ message: "missing action data" })
    } else if (!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    } else if (!req.body.notes){
        res.status(400).json({ message: "missing required notes field" })
    } else {
        next()
    }
}

module.exports = router