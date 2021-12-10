import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistsPropsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to watch', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== id)})
    }

    function addTask(todolistID: string, newTitle: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, isDone: boolean, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    const changeTaskTitle = (todolistID: string, title: string, taskId: string) => {
        const copyTask = {...tasks}
        copyTask[todolistID] = tasks[todolistID].map(task => task.id === taskId ? {...task, title: title} : task)
        setTasks(copyTask)
    }

    const changeTodolistFilter = (todolistID: string, filter: ChangeFilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const newTodoListID = v1()
        setTodolists([{id: newTodoListID, title, filter: 'All'},...todolists])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistID ? {...todo, title} : todo))
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

export default App;
