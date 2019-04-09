import React, { useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const app = (props) => {
	const [ page, setPage ] = useState('auth');

	const switchPage = (pageName) => {
		setPage(pageName);
	};

	/* Alternatives from Q&A instead of .bind:
	 1. onLoadTodos={() => switchPage('todos')
	 2. If you define the function like:
		const switchPage = pageName = () => setPage(pageName)
		then:
		onLoadAuth={switchPage('auth')}
		3. onLoadTodos={setPage.bind(this, 'todos')}
	 */

	return (
		<div className="App">
			<Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
			<hr />
			{page === 'todos' ? <Todo /> : <Auth />}
		</div>
	);
};

export default app;
