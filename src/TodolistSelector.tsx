import React, {useCallback} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasksReducer";
import {
    changeTodolistFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator
} from "./state/todolistsReducer";
import {ChangeFilterValuesType, TodolistPropsType} from "./AppWithRedux";
import {TasksType} from "./AppWithReducer";
import {Task} from "./Task";

export type PropsType = {
    todolistId: string
}

export const TodolistSelector = React.memo((props: PropsType) => {

    const {todolistId} = props

    const todo = useSelector<AppRootStateType, TodolistPropsType>(state => state.todolists.filter(t => t.id === todolistId)[0])
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolistId])

    const dispatch = useDispatch()

    const onChangeFilterHandler = useCallback((value: ChangeFilterValuesType) => dispatch(changeTodolistFilterActionCreator(todolistId, value)), [todolistId, dispatch])

    const onClickRemoveTodolist = useCallback(() => dispatch(removeTodolistActionCreator(todolistId)), [todolistId, dispatch])

    const addTaskToTodoList = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch, todolistId])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleActionCreator(todolistId, title))
    }, [todolistId, dispatch]);

    let tasksForTodolist = tasks
    if (todo.filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (todo.filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
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
            {
                tasksForTodolist.map((el) => {
                    return (
                        <Task key={el.id}
                              taskId={el.id}
                              todolistId={todolistId}
                        />
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
})