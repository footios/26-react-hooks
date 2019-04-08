import React, { useState } from 'react';

const todo = (props) => {
	/* useState('...') takes an initial state and it returns an array with 2 elements. 
    The 1st is the current state. 
    The 2nd is a function we can use to manipulate that state. */

	const [ todoName, setTodoName ] = useState('');
	const [ todoList, setTodoList ] = useState([]);

	const inputStateHandler = (event) => {
		setTodoName(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList(todoList.concat(todoName))
	};

	/* With React.Fragment we can have top level siblings */
	return (
		<React.Fragment>
			<input type="text" placeholder="Todo" onChange={inputStateHandler} value={todoName} />
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			<ul>{todoList.map((todo, index) => <li key="index">{todo}</li>)}</ul>
		</React.Fragment>
	);
};

export default todo;
