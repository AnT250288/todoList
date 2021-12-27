import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo(({title, ...props}: EditableSpanPropsType) => {
    console.log("Render")

    debugger;

    const [editMode, setEditMode] = useState<boolean>(false)
    const [editTitle, setEditTitle] = useState<string>(title)
    const onChangeSetTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(editTitle)
    }

    return (
        editMode
            ? <TextField
                onChange={onChangeSetTitleHandler}
                onBlur={offEditMode}
                autoFocus
                value={editTitle}/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})