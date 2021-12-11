import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistActionCreator,
    changeTodolistFilterActionCreator, changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsPropsType = {
    id: string
    title: string
    filter: ChangeFilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type ChangeFilterValuesType = 'All' | 'Active' | 'Completed'

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsPropsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = (taskId: string, todolistID: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }
    function addTask(todolistID: string, newTitle: string) {
        dispatch(addTaskAC(newTitle, todolistID))
    }
    const changeTaskStatus = (todolistID: string, isDone: boolean, taskId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }
    const changeTaskTitle = (todolistID: string, title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistID))
    }

    const changeTodolistFilter = (todolistID: string, filter: ChangeFilterValuesType) => {
        dispatch(changeTodolistFilterActionCreator(todolistID, filter))
    }
    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistActionCreator(todolistID)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        let action = addTodolistActionCreator(title)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatch(changeTodolistTitleActionCreator(todolistID, title))
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoLists
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4} style={{padding: '20px 0'}}>
                    {todolists.map(tdl => {
                        let tasksForTodolist = tasks[tdl.id]
                        if (tdl.filter === 'Active') {
                            tasksForTodolist = tasks[tdl.id].filter(task => !task.isDone)
                        }
                        if (tdl.filter === 'Completed') {
                            tasksForTodolist = tasks[tdl.id].filter(task => task.isDone)
                        }
                        return (
                            <Grid item key={tdl.id}>
                                <Paper elevation={8} style={{padding: '20px'}}>
                                    <Todolist
                                        todolistID={tdl.id}
                                        title={tdl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeFilter={changeTodolistFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        addTask={addTask}
                                        filter={tdl.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
