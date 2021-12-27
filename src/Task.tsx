import {TasksType} from "./AppWithReducer";
import React from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Clear} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const Task = React.memo(({todolistId, taskId}: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks[todolistId]
        .filter(task => task.id === taskId)[0]);

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const changeTaskTitle = (editTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, editTitle, todolistId))
    }
    const onChangeHandlerForCheckbox = (isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    return <ListItem key={task.id} divider
                     style={{
                         display: 'flex',
                         justifyContent: 'space-between',
                         fontWeight: 'bold'
                     }}>

        <div className={task.isDone ? 'isDone' : ''}
             style={{display: 'inline'}}>
            <Checkbox
                color={'primary'}
                checked={task.isDone}
                onChange={(event) => onChangeHandlerForCheckbox(event.currentTarget.checked)}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        </div>
        <IconButton onClick={removeTaskHandler}>
            <Clear/>
        </IconButton>
    </ListItem>
})