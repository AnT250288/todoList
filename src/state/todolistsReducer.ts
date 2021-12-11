import {ChangeFilterValuesType, TodolistsPropsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListID: string
    filter: ChangeFilterValuesType
}

let initialState: Array<TodolistsPropsType> = []

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state=initialState, action: ActionType): Array<TodolistsPropsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter: 'All'}, ...state]
        case  "CHANGE-TODOLIST-TITLE":
            return state.map(todo => todo.id === action.todoListID ? {...todo, title: action.title} : todo)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todoListID ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export const removeTodolistActionCreator = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todolistID
    }
}

export const addTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}

export const changeTodolistTitleActionCreator = (todoListID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todoListID,
        title: title
    }
}

export const changeTodolistFilterActionCreator = (todoListID: string,
                                                  filter: ChangeFilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID,
        filter
    }
}
