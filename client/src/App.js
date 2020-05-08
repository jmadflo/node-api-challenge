import React, { useState } from 'react'
import axios from 'axios'
import { Route, useHistory, Switch } from 'react-router-dom'
import ProjectInfo from './components/ProjectInfo'
import './App.css'

function App() {
  // project data from api

  const history = useHistory()

  const [ dataToRender, setDataToRender] = useState([])
  
  const [ projectFormValues, setProjectFormValues ] = useState({
    id: '',
    name: '',
    description: '',
    completed: false
  })

  const [ actionFormValues, setActionFormValues ] = useState({
    id: '',
    project_id: '',
    description: '',
    notes: '',
    completed: false
  })

  const [ clickedProject, setClickedProject ] = useState('')

  // update form values
  const updateProjectForm = event => {
    setProjectFormValues({
      ...projectFormValues,
      [event.target.name]: event.target.type === 'text' ? event.target.value : event.target.checked
    })
  }

  const updateActionForm = event => {
    setActionFormValues({
      ...actionFormValues,
      [event.target.name]: event.target.type === 'text' ? event.target.value : event.target.checked
    })
  }

  // get all project data
  const getAllProjects = () => {
    axios.get('http://localhost:7000/api/projects/')
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // get a specific project by id
  const getProjectById = () => {
    axios.get(`http://localhost:7000/api/projects/${projectFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // get actions for a specific project by project id
  const getActionsByProjectId = id => {
    if (typeof id !== 'number') {
      id = projectFormValues.id || actionFormValues.project_id
    }
    axios.get(`http://localhost:7000/api/projects/${id}/actions`)
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // post a new project
  const postNewProject = () => {
    axios.create({ headers: {'Content-Type': 'application/json'} })
      .post('http://localhost:7000/api/projects/', {
        name: projectFormValues.name,
        description: projectFormValues.description,
        completed: projectFormValues.completed
      })
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // post a new post by project id
  const postNewAction = () => {
    axios.create({ headers: {'Content-Type': 'application/json'} })
      .post(`http://localhost:7000/api/projects/${actionFormValues.project_id || projectFormValues.id}/actions`, {
        project_id: actionFormValues.project_id,
        description: actionFormValues.description,
        notes: actionFormValues.notes,
        completed: actionFormValues.completed
      })
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // delete project by id
  const deleteProject = () => {
    axios.delete(`http://localhost:7000/api/projects/${projectFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender([response.data]) // put in array as response.data is an object unlike the other responses, which are arrays
      })
      .catch(error => console.log(error))
  }

  // edit project with project id
  const editProject = () => {
    axios.create({ headers: {'Content-Type': 'application/json'} })
      .put(`http://localhost:7000/api/projects/${projectFormValues.id}`, {
        name: projectFormValues.name,
        description: projectFormValues.description,
        completed: projectFormValues.completed
      })
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // get all post data
  const getAllActions = () => {
    axios.get('http://localhost:7000/api/actions/')
      .then(response => {
        console.log(response)
        setDataToRender(response.data)
      })
      .catch(error => console.log(error))
  }

  // get a specific post by id
  const getActionById = () => {
    axios.get(`http://localhost:7000/api/actions/${actionFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // delete post by id
  const deleteAction = () => {
    axios.delete(`http://localhost:7000/api/actions/${actionFormValues.id}`)
      .then(response => {
        console.log(response)
        setDataToRender([response.data]) // put in array as response.data is an object unlike the other responses, which are arrays
      })
      .catch(error => console.log(error))
  }

  // edit post with post id
  const editAction = () => {
    axios.create({ headers: {'Content-Type': 'application/json'} })
      .put(`http://localhost:7000/api/actions/${actionFormValues.id}`, {
        project_id: actionFormValues.project_id,
        description: actionFormValues.description,
        notes: actionFormValues.notes,
        completed: actionFormValues.completed
      })
      .then(response => {
        console.log(response)
        setDataToRender([response.data])
      })
      .catch(error => console.log(error))
  }

  // routes to unique url and renders the actions for that project
  const routeAndGetProjectActions = (id, name) => {
    setClickedProject(name)
    getActionsByProjectId(id)
    history.push(`/projects/${id}`)
  }
  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <h1>Snobby API Tester</h1>
          <div className='formAndButtons'>
            <div className='formContainer'>
              <form>
                <h2>Project Form</h2>
                <input name='id' placeholder='id' value={projectFormValues.id} onChange={updateProjectForm}/>
                <input name='name' placeholder='name' value={projectFormValues.name} onChange={updateProjectForm}/>
                <input name='description' placeholder='description' value={projectFormValues.description} onChange={updateProjectForm}/>
                <label htmlFor='project completed'>Completed: 
                  <input id='project completed' name='completed' type='checkbox' checked={projectFormValues.completed} onChange={updateProjectForm}/>
                </label>
              </form>
              <form>
                <h2>Action Form</h2>
                <input name='id' placeholder='id' value={actionFormValues.id} onChange={updateActionForm}/>
                <input name='project_id' placeholder='project id' value={actionFormValues.project_id} onChange={updateActionForm}/>
                <input name='description' placeholder='description' value={actionFormValues.description} onChange={updateActionForm}/>
                <input name='notes' placeholder='notes' value={actionFormValues.notes} onChange={updateActionForm}/>
                <label htmlFor='action completed'>Completed: 
                  <input id='action completed' name='completed' type='checkbox' checked={actionFormValues.completed} onChange={updateActionForm}/>
                </label>
                

              </form>
            </div>
            <div className='buttonContainer'>
              <button onClick={getAllProjects}>Get All Projects</button>
              <button onClick={getProjectById}>Get Project By Id</button>
              <button onClick={postNewProject}>Post New Project</button>
              <button onClick={postNewAction}>Post New Action</button>
              <button onClick={deleteProject}>Delete Project</button>
              <button onClick={editProject}>Edit Project</button>
              <button onClick={getAllActions}>Get All Actions</button>
              <button onClick={getActionById}>Get Action By Id</button>
              <button onClick={deleteAction}>Delete Action</button>
              <button onClick={editAction}>Edit Action</button>
            </div>
          </div>
          {/* render data */}
          {dataToRender.map(instance => {
            // will render if instance is a project
            if (instance.name){
              return (
                <div key={instance.id} className='instance'>
                  <p>Id: {instance.id}</p>
                  <p onClick={() => routeAndGetProjectActions(instance.id, instance.name)}>Name: {instance.name}</p>
                  <p>Description: {instance.description}</p>
                  <p>Completed: {instance.completed ? 'true' : 'false'}</p>
                </div>
              )
            } else if (instance.message){ // will render if instance is a message object
              return (
                <div key={instance.message} className='instance'>
                  <p>Message: {instance.message}</p>
                </div>
              )
            } else if (instance.notes){ // actions have notes property
              return (
                <div key={instance.id} className='instance'>
                  <p>Id: {instance.id}</p>
                  <p>Project_Id: {instance.project_id}</p>
                  <p>Description By: {instance.description}</p>
                  <p>Notes By: {instance.notes}</p>
                  <p>Completed: {instance.completed ? 'true' : 'false'}</p>
                </div>
              )
            } else {
              return (
                <div key={instance.id} className='instance'>
                  <p>This is a weird thing we got</p>
                </div>
              )
            }
          })}
        </div>
      </Route>
      <Route path='/projects/:id'>
        <ProjectInfo dataToRender={dataToRender} clickedProject={clickedProject}/>
      </Route>
    </Switch>
  )
}

export default App