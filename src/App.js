import React, { useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const app = (props) => {
	const [ showTodos, setShowTodos ] = useState(true);
	const [ showAuth, setShowAuth ] = useState(true);

	const loadTodosHandler = () => {
		setShowTodos(!showTodos);
	};

	const loadAuthHandler = () => {
		setShowAuth(!showAuth);
	};

	return (
		<div className="App">
		<Header onLoadTodos={loadTodosHandler} onLoadAuth={loadAuthHandler} />
		<hr />
			{showTodos ? <Todo />
			 : null}
			{showAuth ? <Auth /> : null}
			
		</div>
	);
};

export default app;
