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

// returns action with a specified id
router.get('/:id', validateActionId, (req, res) => {
    actionData.get(req.params.id)
        .then(singleAction => {
            // returns the one action with an id of req.params.id
            res.status(200).json(singleAction)
        })
        .catch(() => {
            res.status(500).json({ message: `The action with an id of ${req.params.id} could not be retrieved from the database.` })
        })
})

// deletes an action using its id
router.delete('/:id', validateActionId, (req, res) => {
    actionData.remove(req.params.id)
        .then(numberOfDeletedActions => {
            // only returns a confirmation message
            if (numberOfDeletedActions === 1){
                res.status(200).json({ message: `The action with an id of ${req.params.id} was deleted from the database.` })
            } else {
                res.status(500).json({ message: `The action with an id of ${req.params.id} could not be deleted from the database.` })
            }
        })
        .catch(() => {
            res.status(500).json({ message: `The action with an id of ${req.params.id} could not be deleted from the database.` })
        })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    // first, action with id of req.params.id is updated
    actionData.update(req.params.id, req.body)
        // then, if update is successful, return the updated action to the client
        .then(updatedAction => {
            console.log(updatedAction)
            res.status(200).json(updatedAction)
        })
        .catch(() => {
            res.status(500).json({ message: `The action with an id of ${req.params.id} could not be retrieved once updated.` })
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