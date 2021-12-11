import React from "react";
import {ChangeFilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {
    changeTodolistFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator
} from "./state/todolistsReducer";

export type TodolistPropsType = {
    todolistID: string
}

export function TodolistSelectorExample(props: TodolistPropsType) {

    const {todolistId} = props

    const todo = useSelector<AppRootStateType, TodolistPropsType>(state => state.todolists.filter(t => t.id === todolistId)[0])
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolistId])

    const dispatch = useDispatch()


    const onChangeFilterHandler = (value: ChangeFilterValuesType) => dispatch(changeTodolistFilterActionCreator(todolistId, value))
    const onChangeHandlerForCheckbox = (isDone: boolean, tID: string) => {
        dispatch(changeTaskStatusAC(isDone, tID))
    }
    const onClickRemoveTodolist = () => dispatch(removeTodolistActionCreator(todolistId))
    const addTaskToTodoList = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodolistTitleActionCreator(todolistId, title))
    }

    return <div className={'todoList'}>
        <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
            <EditableSpan title={todo.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodolist} color={'primary'}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskToTodoList}/>
        <List>
            {tasks.map((el) => {
                const removeTaskHandler = () => {
                    dispatch(removeTaskAC(el.id, todolistId))
                }
                const changeTaskTitle = (editTitle: string) => {
                    dispatch(changeTaskTitleAC(el.id, editTitle, todolistId))
                }
                return (
                    <ListItem key={el.id} divider
                              style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  fontWeight: 'bold'
                              }}>

                        <div className={el.isDone ? 'isDone' : ''}
                             style={{display: 'inline'}}>
                            <Checkbox
                                color={'primary'}
                                checked={el.isDone}
                                onChange={(event) => onChangeHandlerForCheckbox(event.currentTarget.checked, el.id)}/>
                            <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
                        </div>
                        <IconButton onClick={removeTaskHandler}>
                            <Clear/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>
        <div>
            <ButtonGroup variant={'contained'}
                         size={'small'}>
                <Button
                    color={todo.filter === "All" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler("All")}>All
                </Button>
                <Button
                    color={todo.filter === "Active" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler('Active')}>Active
                </Button>
                <Button
                    color={todo.filter === "Completed" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler('Completed')}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}