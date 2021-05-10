import React, { useReducer, useContext } from 'react'
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    SHOW_LOADER,
    SHOW_ERROR,
    CLEAR_ERROR,
    HIDE_LOADER,
    FETCH_TODOS
} from './../types';

import { ScreenContext } from './../screen/screenContext';
import { Alert } from 'react-native'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const { changeScreen } = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title) => {
        const response = await fetch('https://todo-app-on--rn-default-rtdb.firebaseio.com/todos.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        })
        const data = await response.json()
        // console.log('ID:', data.name)

        dispatch({ type: ADD_TODO, title, id: data.name })
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            "Task removal",
            `Are you sure you want to remove? 
                  "${todo.title}"
                  `,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        await fetch(`https://todo-app-on--rn-default-rtdb.firebaseio.com/todos/${id}.json`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        dispatch({ type: REMOVE_TODO, id })
                    }
                }
            ],
            { cancelable: false }
        );

    }
    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const response = await fetch('https://todo-app-on--rn-default-rtdb.firebaseio.com/todos.json', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            // console.log('fetched data:', data)
            const todos = Object.keys(data).map(key => ({
                ...data[key], id: key
            }))
            dispatch({ type: FETCH_TODOS, todos })
        } catch (error) {
            showError('Something went wrong, try again!')
            console.log(error)
        } finally {
            hideLoader()
        }

    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await fetch(`https://todo-app-on--rn-default-rtdb.firebaseio.com/todos/${id}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            })
            dispatch({ type: UPDATE_TODO, id, title })

        } catch (error) {
            showError('Something went wrong, try again!')
            console.log(error)
        }
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos,
                loading: state.loading,
                error: state.error
            }}>
            {children}
        </TodoContext.Provider>
    )
}
