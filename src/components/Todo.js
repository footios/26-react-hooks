import React, { useState } from 'react';

const todo = (props) => {
	/* useState('...') takes an initial state and it returns an array with 2 elements. 
    The 1st is the current state. 
    The 2nd is a function we can use to manipulate that state. */

	// const [ todoName, setTodoName ] = useState('');
    // const [ todoList, setTodoList ] = useState([]);
    
    /* Insted of the above code we can merge the states into an object.
    This though is not the optimal approach here,
    because we have to update every property in the object everytime. */

    const [todoState, setTodoState] = useState({userInput: '', todoList: []})

	// const inputStateHandler = (event) => {
	// 	setTodoName(event.target.value);
    // };
    
    const inputStateHandler = (event) => {
        setTodoState({userInput: event.target.value, todoList: todoState.todoList})
    }

	// const todoAddHandler = () => {
	// 	setTodoList(todoList.concat(todoName))
    // };
    
    const todoAddHandler = () => {
        setTodoState({
            userInput: todoState.userInput,
            todoList: todoState.todoList.concat(todoState.userInput)
        })
    }


	/* With React.Fragment we can have top level siblings */
	return (
		<React.Fragment>
			<input type="text" placeholder="Todo" onChange={inputStateHandler} value={todoState.userInput} />
			<button type="button" onClick={todoAddHandler}>
				Add
			</button>
			<ul>{todoState.todoList.map((todo, index) => <li key={index}>{todo}</li>)}</ul>
		</React.Fragment>
	);
};

export default todo;
