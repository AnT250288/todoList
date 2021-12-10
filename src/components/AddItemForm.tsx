import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm({addItem, ...props}: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandlerSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onClickHandlerForAddItem = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }
    const onKeyPressHandlerForAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") {
            onClickHandlerForAddItem()
        }
    }
/*    const errorMessage = error
        ? <p style={{margin: '0', color: 'red'}}>Title is required!</p>
        : null*/
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{flexGrow: 2}}>
                <TextField
                    fullWidth
                    size={'small'}
                    variant={'outlined'}
                    value={title}
                    onKeyPress={onKeyPressHandlerForAddItem}
                    onChange={onChangeHandlerSetTitle}
                    className={error ? 'error' : ''}
                    label={'Title'}
                    error={error}
                    helperText={error && "Title is required!"}
                />
            </div>
            <IconButton
                color={'primary'} onClick={onClickHandlerForAddItem}>
                <AddBox/>
            </IconButton>
           {/* {errorMessage}*/}
        </div>
    )
}