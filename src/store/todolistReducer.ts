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

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (todoLists: Array<TodolistsPropsType>, action: ActionType): Array<TodolistsPropsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter: 'All'}, ...todoLists]
        case  "CHANGE-TODOLIST-TITLE":
            return todoLists.map(todo => todo.id === action.todoListID ? {...todo, title: action.title} : todo)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(el => el.id === action.todoListID ? {...el, filter: action.filter} : el)
        default:
            return todoLists
    }
}

export const RemoveTodolistActionCreator = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todolistID
    }
}

export const AddTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}

export const ChangeTodolistTitleActionCreator = (todoListID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todoListID,
        title: title
    }
}

export const ChangeTodolistFilterActionCreator = (todoListID: string,
                                                  filter: ChangeFilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID,
        filter
    }
}
