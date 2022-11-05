import React from 'react'
import { Icon } from 'react-icons-kit'
import { trash, edit } from 'react-icons-kit/feather'

const View = ({ tasks, deletetask, handleEditClick, isEditing }) => {


    return tasks.map((task) => (
        <tr key={task.id}>
            <td className='text-center' >{task.task}</td>
            <td className='text-center' >{task.comment}</td>
            <td className='text-center' >{task.time}</td>
            {!isEditing ? <>
                <td className='text-center text-primary' onClick={() => handleEditClick(task)}>
                    <Icon icon={edit} />
                </td>
                <td className='delete-btn text-center' onClick={() => deletetask(task.id)}>
                    <Icon icon={trash} />
                </td>
            </> : <></>}
        </tr>
    ))
}

export default View