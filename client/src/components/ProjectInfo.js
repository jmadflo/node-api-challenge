import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const ProjectInfo = props => {
    const { id } = useParams()

    return (
        <div className='UserInfo'>
            <h1>{props.clickedProject}</h1>
            <h2>Id: {id}</h2>
            <h2>Posts:</h2>
            {props.dataToRender.map(action => {
                return (
                    <div key={action.id} className='instance'>
                        <p>Id: {action.id}</p>
                        <p>Project_Id: {action.project_id}</p>
                        <p>Description By: {action.description}</p>
                        <p>Notes By: {action.notes}</p>
                        <p>Completed: {action.completed ? 'true' : 'false'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectInfo