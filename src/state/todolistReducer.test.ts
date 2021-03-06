import {
    ActionType,
    addTodolistActionCreator, changeTodolistFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
    todolistsReducer
} from './todolistsReducer';
import {v1} from 'uuid';
import {ChangeFilterValuesType, TasksStateType, TodolistsPropsType} from '../App';
import {tasksReducer} from "./tasksReducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistsPropsType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsPropsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState,
        addTodolistActionCreator(newTodolistTitle)
    )

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsPropsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: ChangeFilterValuesType = "Completed";

    const startState: Array<TodolistsPropsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: ActionType =
        {
            type: 'CHANGE-TODOLIST-FILTER',
            todoListID: todolistId2,
            filter: newFilter
        };

    const endState = todolistsReducer(startState, changeTodolistFilterActionCreator(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



