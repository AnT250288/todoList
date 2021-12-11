import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistActionCreator,
    changeTodolistFilterActionCreator, changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";

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

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to watch', filter: 'All'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Movie', isDone: true},
            {id: v1(), title: 'Document', isDone: false},
            {id: v1(), title: 'Anime', isDone: false},
        ]
    })

    const removeTask = (taskId: string, todolistID: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistID))
    }

    function addTask(todolistID: string, newTitle: string) {
        dispatchToTasks(addTaskAC(newTitle, todolistID))
    }

    const changeTaskStatus = (todolistID: string, isDone: boolean, taskId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
    }
    const changeTaskTitle = (todolistID: string, title: string, taskId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todolistID))
    }

    const changeTodolistFilter = (todolistID: string, filter: ChangeFilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterActionCreator(todolistID, filter))
    }
    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistActionCreator(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodolist = (title: string) => {
        let action = addTodolistActionCreator(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatchToTodolists(changeTodolistTitleActionCreator(todolistID, title))
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
                            tasksForTodolist = tasks[tdl.id].filter(task => task.isDone === false)
                        }
                        if (tdl.filter === 'Completed') {
                            tasksForTodolist = tasks[tdl.id].filter(task => task.isDone === true)
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

export default AppWithReducer;
