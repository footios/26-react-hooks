import React, { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

const todo = (props) => {
	const [ todoName, setTodoName ] = useState('');
	// we don't need this anymore because of the way `useReducer` works.
	/* With `dispatch` the `todoListReducer` will always receive the latest state. */
	// const [ submittedTodo, setSubmittedTodo ] = useState(null);
	
	// useReducer allows us to bundle the logic we update the state in one func
	// const [ todoList, setTodoList ] = useState([]); // we use the useReducer instead

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

	// useEffect(
	// 	() => {
	// 		if (submittedTodo) {
	// 			dispatch({ type: 'ADD', payload: submittedTodo }); // now fetch button is reduntand.
	// 		}
	// 	},
	// 	[ submittedTodo ]
	// );

	const inputStateHandler = (event) => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		axios
			.post('https://todolist-58f53.firebaseio.com/todos.json', { name: todoName })
			.then((res) => {
				setTimeout(() => {
					console.log(res);
					const todoItem = { id: res.data.name, name: todoName };
					dispatch({type: 'ADD', payload: todoItem});
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

	return (
		<React.Fragment>
			<input type="text" placeholder="Todo" onChange={inputStateHandler} value={todoName} />
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			<ul style={{ listStyleType: 'none' }}>
				{todoList.map((todo) => (
					<li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
						{todo.name}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default todo;
