import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistActionCreator
} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistSelector} from "./TodolistSelector";

export type TodolistPropsType = {
    id: string
    title: string
    filter: ChangeFilterValuesType
}

export type ChangeFilterValuesType = 'All' | 'Active' | 'Completed'

const AppWithRedux = React.memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistPropsType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistActionCreator(title))
    }, [dispatch]);

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

                        return (
                            <Grid item key={tdl.id}>
                                <Paper elevation={8} style={{padding: '20px'}}>
                                    <TodolistSelector
                                        key={tdl.id}
                                        todolistId={tdl.id}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;
