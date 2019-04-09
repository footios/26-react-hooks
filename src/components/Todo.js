import React, { useState, useEffect } from 'react';

import axios from 'axios';

const todo = (props) => {
	/* RULES
    You must set the Hooks, only at the top-level of your function! */

	/* useState('...') takes an initial state and it returns an array with 2 elements. 
    The 1st is the current state. 
    The 2nd is a function we can use to manipulate that state. */

	const [ todoName, setTodoName ] = useState('');
	const [ todoList, setTodoList ] = useState([]);
	const [ todoButton, setTodoButton ] = useState(false);

	/* Let's say that we want to load the todos we send to the server,
       at the point when this component gets loaded. 
       
       We must do it in the `useEffect` hook, because it hooks into React's internals and makes sure
       that this code executes at the right time 
       which is after this render cycle finished,
       so that this can run in a high performant way 
       and that the UI is always updated correctly 
       and you don't end up with some strange state changes 
       behind the scenes outside of what React expected.

       So we added the `useEffect` hook to cause side effects,
       it worked but we caused quite a big side effect 
       because we entered an infinite loop.
       The reason for that is that useEffect does not only run once, 
       like for example componentDidMount did
       but it runs after every render cycle.
       `useEffect`, takes a second argument, which is an array of values.
       If one of these values changes only then useEffect runs.
       If you put an empty array, you copy componentDidMout,
       because it runs only once.
*/
	useEffect(
		() => {
			axios
				.get('https://todolist-58f53.firebaseio.com/todos.json')
				.then((res) => {
					console.log(res);
					const todoData = res.data;
					const todos = [];
					for (const key in todoData) {
						todos.push({ id: key, name: todoData[key].name });
					}
					setTodoList(todos);
				})
				.catch((err) => {
					console.log(err);
				});
			/* Replicating `componentWillUnmount`
        If you add `return` statement here, 
        then this return statement should also be a function, 
        which will be executed by React on every render
        cycle too and React will actually execute this as a cleanup 
        before it applies the effect of your main
        code again.
        */
			return () => {
				console.log('Cleanup');
			};
		},
		[ todoButton ]
	);

	const inputStateHandler = (event) => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList(todoList.concat(todoName));
		axios
			.post('https://todolist-58f53.firebaseio.com/todos.json', { name: todoName })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

    // For showing the todo on our page
	const todoFetchHandler = () => {
		setTodoButton(!todoButton);
		console.log(todoButton);
	};

	return (
		<React.Fragment>
			<input type="text" placeholder="Todo" onChange={inputStateHandler} value={todoName} />
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			<button type="button" onClick={todoFetchHandler}>
				Fetch
			</button>
			<ul style={{listStyleType:'none'}} >{todoList.map((todo, index) => <li key={index}>{todo.name}</li>)}</ul>
		</React.Fragment>
	);
};

export default todo;
