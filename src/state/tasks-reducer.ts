import {v1} from "uuid";
import {TasksType} from "../App";
import {addTodolistActionType, removeTodolistActionType, todolistID1, todolistID2} from "./toDoLists-reducer";

export type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskTitleActionType
    | changeTaskStatusActionType
    | addTodolistActionType
    | removeTodolistActionType
type removeTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export const removeTaskAC = (todolistID: string, taskID: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", todolistID: todolistID, taskID: taskID}
}
type addTaskActionType = {
    type: "ADD-TASK"
    todolistID: string
    taskID: string
    title: string
}
export const addTaskAC = (todolistID: string, title: string): addTaskActionType => {
    return {type: "ADD-TASK", taskID: v1(), todolistID: todolistID, title: title}
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistID: string
    taskID: string
    title: string
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistID: todolistID, taskID: taskID, title: title}
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistID: string
    taskID: string
    isDone: boolean
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistID: todolistID, taskID: taskID, isDone: isDone}
}

const initialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false}
    ]
}
export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {
                    id: action.taskID,
                    title: action.title,
                    isDone: false
                }]
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            };
        case "ADD-TODOLIST":
            return {
                [action.todolistID]: [], ...state
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            };
        case "REMOVE-TODOLIST":
            delete state[action.id];
        default:
            return state
    }
}