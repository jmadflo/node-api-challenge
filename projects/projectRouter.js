const express = require('express')
const projectData = require('../data/helpers/projectModel')

const router = express.Router()

// middleware

function validateProjectId(req, res, next) {
    // get project with the params id and assign it to req.project, otherwise return a 400 error
    projectData.getById(req.params.id)
        .then(project => {
            req.project = project
            next()
        })
        .catch(() => {
            res.status(400).json({ message: "invalid project id" })
        })
}
  
  function validateProject(req, res, next) {
    // send 400 error if req.body is missing, if req.body.name is missing, or if req.body.description is missing
    if (!req.body){
        res.status(400).json({ message: "missing project data" })
    } else if (!req.body.name){
        res.status(400).json({ message: "missing required name field" })
    } else if (!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    } else {
        next()
    }
  }
  
  function validateAction(req, res, next) {
    // send 400 error if req.body is missing or if req.body.project_id, description, or notes is missing
    if (!req.body){
        res.status(400).json({ message: "missing action data" })
    } else if (!req.body.project_id){
        res.status(400).json({ message: "missing required project_id field" })
    } else if (!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    } else if (!req.body.notes){
        res.status(400).json({ message: "missing required notes field" })
    } else {
        next()
    }
  }

module.exports = router