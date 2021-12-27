import React, {useCallback} from "react";
import {ChangeFilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";

export type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: ChangeFilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, isDone: boolean, tId: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
    changeTaskTitle: (todolistID: string, title: string, taskId: string) => void
    filter: ChangeFilterValuesType
}

export function Todolist(props: TodolistPropsType) {
    /* let [newTitle, setNewTitle] = useState('')
     let [error, setError] = useState<string | null>(null)*/
    /*const onClickHandlerForAddTask = () => {
        if (newTitle.trim() !== "") {
            props.addTask(props.todolistID, newTitle.trim());
            setNewTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            props.addTask(props.todolistID,newTitle)
            setNewTitle('')
        }
    }*/

    const onChangeFilterHandler = (value: ChangeFilterValuesType) => props.changeFilter(props.todolistID, value);
    const onChangeHandlerForCheckbox = (isDone: boolean, tID: string) => {
        props.changeTaskStatus(props.todolistID, isDone, tID)
    }
    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistID)
    const addTaskToTodoList = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    },[props.addTask, props.todolistID])
    const changeTodoListTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistID)
    }

    return <div className={'todoList'}>
        <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodolist} color={'primary'}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTaskToTodoList}/>
        <List>
            {props.tasks.map((el) => {
                const removeTaskHandler = () => {
                    props.removeTask(props.todolistID, el.id)
                }
                const changeTaskTitle = (editTitle: string) => {
                    props.changeTaskTitle(props.todolistID, editTitle, el.id)
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
                            {/*<input type="checkbox"
                               checked={el.isDone}
                               onChange={(event) => onChangeHandlerForCheckbox(event.currentTarget.checked, el.id)}/>*/}
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
                    color={props.filter === "All" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler("All")}>All
                </Button>
                <Button
                    color={props.filter === "Active" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler('Active')}>Active
                </Button>
                <Button
                    color={props.filter === "Completed" ? 'secondary' : 'primary'}
                    onClick={() => onChangeFilterHandler('Completed')}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}