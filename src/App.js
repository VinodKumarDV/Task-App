import React, { useState } from 'react'
import View from './components/View';
import { addTask, deleteTask, deleteAllTask, updateTask, clearUndoTask, undoTask } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-icons-kit'
import { undo2, cross } from 'react-icons-kit/icomoon';
import Counter from './components/Counter'

const App = () => {

  const [undo, setUndo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFood, setCurrentProd] = useState({});

  const [task, settask] = useState('');
  const [comment, setComment] = useState('');
  const [time, setTime] = useState('00:00:00');
  const tasks = useSelector((state) => state.taskReducer.tasks)

  const dispatch = useDispatch();

  const handleAddFoodSubmit = (e) => {
    e.preventDefault();

    let Prod = {
      id: new Date().getTime().toString(),
      task,
      comment,
      time
    }
    setUndo(false)
    dispatch(addTask(Prod))
    settask('');
    setComment('');
    setTime('');
  }

  const handleEditClick = (task) => {
    setIsEditing(true)
    setCurrentProd({ ...task })
  }

  const setAvail = (renderedStreamDuration) => {
    setCurrentProd((currentFood) => ({
      ...currentFood,
      time: renderedStreamDuration
    }))  
  }

  const handleEditFoodSubmit = (e) => {
    e.preventDefault();

    dispatch(updateTask(currentFood), setIsEditing(false))
    console.log(currentFood)
  }

  const handleEditInputChange = (name) => (e) => {
    setCurrentProd((currentFood) => ({
      ...currentFood,
      [name]: e.target.value
    }))
  }


  const deletetask = (id) => {
    dispatch(deleteTask(id))
  }


  return (
    <div className='wrapper'>
      <h1>Task App</h1>
      <div className='main'>
        {isEditing ? (
          <div className='form-container h-100'>
            <h4 className='text-center taskH4'>Curent Task</h4>
            <p>Start the time while working on <b>Task</b></p>
            <form autoComplete="off" className='form-group'
              onSubmit={handleEditFoodSubmit}>
              <h6>Task</h6>
              <input type="text" className='form-control' required value={currentFood.task}
                onChange={handleEditInputChange('task')}></input>
              <br></br>
              <h6>Comment</h6>
              <input type="text" className='form-control' required value={currentFood.comment}
                onChange={handleEditInputChange('comment')}></input>
              <br></br>
              <h6>Time</h6>
              <input type="text" disabled className='form-control' required value={currentFood.time}
                onChange={handleEditInputChange('time')}></input>
              <br></br>
              <Counter setAvail={setAvail} />
              <br></br>
              <button type="submit" className='btn btn-success mb-2 btn-md'>
                UPDATE
              </button>
              <button onClick={() => setIsEditing(false)} className='btn btn-success btn-md'>
                CANCLE
              </button>
            </form>
          </div>

        ) : (
            
          <div className='form-container h-100'>
            <h4 className='text-center'>Add New Task</h4>
            <form autoComplete="off" className='form-group'
              onSubmit={handleAddFoodSubmit}>
              <h6>Task</h6>
              <input type="text" className='form-control' required
                onChange={(e) => settask(e.target.value)} value={task}></input>
              <br></br>
              <h6>Comment</h6>
              <input type="text" className='form-control' required
                  onChange={(e) => setComment(e.target.value)} value={comment}></input>
              <br></br>
              <button type="submit" className='btn btn-success btn-md'>
                ADD
              </button>
            </form>
          </div>
        )}


        <div className='view-container'>
          {tasks.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='text-center' >Task</th>
                    <th className='text-center' >Comment</th>
                    <th className='text-center' >Time</th>
                    {!isEditing ? <>
                      <th className='text-center' >Start Task</th>
                      <th className='text-center' >Delete task</th>
                    </> : <></>}
                  </tr>
                </thead>
                <tbody>
                  <View handleEditClick={handleEditClick} tasks={tasks} deletetask={deletetask} isEditing={isEditing} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => dispatch(deleteAllTask(), setUndo(true))}>Remove All</button>
          </>}
          {tasks.length < 1 && <div><div className='mb-2' >No task are added yet</div>
            {!undo ? <></> : <>Click here <button className='btn btn-success btn-sm col-1.5 '
              onClick={() => dispatch(undoTask(), setUndo(false))}> <Icon icon={undo2} /> </button> to UNDO
              are here <button className='btn btn-danger btn-sm col-1 '
                onClick={() => dispatch(clearUndoTask(), setUndo(false))}> <Icon icon={cross} /> </button> to CANCLE</>}
          </div>}
        </div>

      </div>
    </div>
  )
}

export default App
