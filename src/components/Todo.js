import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms'

const todo = (props) => {
	// const [ todoName, setTodoName ] = useState(''); // we useRef instead

	// we don't need this anymore because of the way `useReducer` works.
	/* With `dispatch` the `todoListReducer` will always receive the latest state. */
	// const [ submittedTodo, setSubmittedTodo ] = useState(null);

	// useReducer allows us to bundle the logic we update the state in one func
	// const [ todoList, setTodoList ] = useState([]); // we use the useReducer instead

	const [ inputIsValid, setInputIsValid ] = useState(false);

	// const todoInputRef = useRef(); // we useFormInput() instead
	const todoInput = useFormInput(); 

	const todoListReducer = (state, action) => {
		switch (action.type) {
			case 'ADD':
				return state.concat(action.payload);
			case 'SET':
				return action.payload; // whatever you return is your new state
			case 'REMOVE':
				return state.filter((todo) => todo.id !== action.payload);
			default:
				return state;
		}
	};
	// 1st: func, 2d: initial state, 3d: action
	const [ todoList, dispatch ] = useReducer(todoListReducer, []);

	useEffect(() => {
		axios
			.get('https://todolist-58f53.firebaseio.com/todos.json')
			.then((res) => {
				console.log(res);
				const todoData = res.data;
				const todos = [];
				for (const key in todoData) {
					todos.push({ id: key, name: todoData[key].name });
				}
				dispatch({ type: 'SET', payload: todos });
			})
			.catch((err) => {
				console.log(err);
			});
		return () => {
			console.log('Cleanup');
		};
	}, []);

	// We useRef instead.
	/* instead we use the internal state management 
	of the input element and use a ref to extract 
	its `current` `value`  */
	// const inputStateHandler = (event) => {
	// 	setTodoName(event.target.value);
	// };

	const todoAddHandler = () => {
		const todoName = todoInput.value;
		axios
			.post('https://todolist-58f53.firebaseio.com/todos.json', { name: todoName })
			.then((res) => {
				setTimeout(() => {
					console.log(res);
					const todoItem = { id: res.data.name, name: todoName };
					dispatch({ type: 'ADD', payload: todoItem });
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const todoRemoveHandler = (todoId) => {
		axios
			.delete(`https://todolist-58f53.firebaseio.com/todos/${todoId}.json`)
			.then((res) => {
				dispatch({ type: 'REMOVE', payload: todoId });
			})
			.catch((err) => console.log(err));
	};

	const inputValidationHandler = (event) => {
		if (event.target.value.trim() === '') {
			setInputIsValid(false);
		} else {
			setInputIsValid(true);
		}
	};

	return (
		<React.Fragment>
			<input
				style={{ backgroundColor: todoInput.validity === true ? 'transparent' : 'red' }}
				type="text"
				placeholder="Todo"
				onChange={todoInput.onChange}
				value={todoInput.value}
			/>
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			{ useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [todoList]) }
		</React.Fragment>
	);
};

export default todo;
