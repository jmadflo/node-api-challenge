const express = require('express')
const projectData = require('../data/helpers/projectModel')
const actionData = require('../data/helpers/actionModel')

const router = express.Router()

// gets array of all of the projects
router.get('/', (req, res) => {
    projectData.get()
        .then(allProjects => {
            // returns all projects
            res.status(200).json(allProjects)
        })
        .catch(() =>{
            res.status(500).json({ message: 'The projects could not be retrieved from the database.' })
        })
})

// get project by its id
router.get('/:id', validateProjectId, (req, res) => {
    projectData.get(req.params.id)
        .then(singleProject => {
            // returns the one project with an id of req.params.id
            res.status(200).json(singleProject)
        })
        .catch(() => {
            res.status(500).json({ message: `The project with an id of ${req.params.id} could not be retrieved from the database.` })
        })
})

// get all actions for a project
router.get('/:id/actions', validateProjectId, (req, res) => {
    projectData.getProjectActions(req.params.id)
        .then(allActionsForProject => {
            // return all actions for project with an id of req.params.id
            res.status(200).json(allActionsForProject)
        })
        .catch(() => {
            res.status(500).json({ message: `The actions associated with the project with an id of ${req.params.id} could not be retrieved from the database.` })
        })
})

// inserts new project into database
router.post('/', validateProject, (req, res) => {
    // do your magic!
    console.log(req.body)
    projectData.insert(req.body)
        .then(insertedProject => {
            console.log(insertedProject)
            // returns inserted project
            res.status(200).json(insertedProject)
        })
        .catch(() => {
            res.status(500).json({ message: 'The project could not be inserted into the database.' })
        })
})

// inserts new action and does validation through middleware
router.post('/:id/actions', validateAction, validateProjectId, (req, res) => {
    // insert new action
    actionData.insert({ ...req.body, project_id: req.params.id })
        .then(insertedAction => {
            // returns the inserted action
            res.status(200).json(insertedAction)
        })
        .catch(() => {
            res.status(500).json({ message: `The action could not be inserted into the database for user with an id of ${req.params.id}.` })
        })
})

// middleware

function validateProjectId(req, res, next) {
    // get project with the params id and assign it to req.project, otherwise return a 400 error
    projectData.get(req.params.id)
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