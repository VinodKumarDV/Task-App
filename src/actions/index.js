export const addTask = (data) => {
    return {
        type: "ADD_TASK",
        payload: {
            data
        }
    }
}
export const updateTask = (data) => {
    return {
        type: "UPDATE_TASK",
        payload: {
            data
        }
    }
}
export const deleteTask = (id) => {
    return {
        type: "DELETE_TASK",
        id
    }
}
export const deleteAllTask = () => {
    return {
        type: "DELETE_ALL_TASK"
    }
}

export const clearUndoTask = () => {
    return {
        type: "CLEAR_UNDO_TASK"
    }
}

export const undoTask = () => {
    return {
        type: "UNDO_TASK"
    }
}