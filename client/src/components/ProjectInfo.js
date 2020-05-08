import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const ProjectInfo = props => {
    const { id } = useParams()

    return (
        <div className='UserInfo'>
            <h1>{props.clickedUser}</h1>
            <h2>Id: {id}</h2>
            <h2>Posts:</h2>
            {props.dataToRender.map(post => {
                return (
                    <div key={post.id} className='instance'>
                        <p>Id: {post.id}</p>
                        <p>Text: {post.text}</p>
                        <p>Posted By: {post.postedBy}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectInfo