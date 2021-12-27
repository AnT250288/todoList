import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistID: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistID: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistID: string
}

let initialState: TasksStateType = {}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            /* const stateCopy = {...state};
             const tasks = state[action.todolistID];
             const filteredTasks = tasks.filter(t => t.id  !== action.taskId);
             stateCopy[action.type] = filteredTasks;
             return stateCopy;*/
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .filter(task => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state, [action.todolistID]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id !== action.taskId ? el : {...el, isDone: action.isDone})
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id !== action.taskId ? el : {...el, title: action.title})
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            //let {[action.todoListID]: [], ...otherProperty} = {...state}
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskId: string, ): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistID,
        taskId
    }
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todolistID
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todolistID
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistID
    }
}
