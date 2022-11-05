const initData = {
    tasks: [],
    deletedTasks: []
}


const taskReducer = (state = initData, action) => {
    switch (action.type) {
        case "ADD_TASK":
            const { data } = action.payload;

            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        ...data
                    }
                ]
            }

        case "DELETE_TASK":
            const filteredFood = state.tasks.filter((element) => {
                return element.id !== action.id
            })
            return {
                ...state,
                tasks: filteredFood
            }

        case "DELETE_ALL_TASK":
            return {
                ...state,
                deletedTasks: state.tasks,
                tasks: []
            }

        case "CLEAR_UNDO_TASK":
            return {
                ...state,
                deletedTasks: []
            }

        case "UNDO_TASK":
            return {
                ...state,
                tasks: state.deletedTasks,
                deletedTasks: []
            }

        case "UPDATE_TASK":

            const updatedFood = state.tasks.map((task) => {
                const { data } = action.payload
                return task.id === data.id ? data : task;
            })
            return {
                ...state,
                tasks: updatedFood
            }

        default: return state
    }
}

export default taskReducer
