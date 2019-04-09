import React, { useContext } from 'react';

import AuthContext from '../auth-context';

const auth = (props) => {
	const auth = useContext(AuthContext);

	return (
		<div>
			{!auth.status ? (
				<button onClick={auth.login}>Log in!</button>
			) : (
				<button onClick={props.onLogout}>Log out</button>
			)}
		</div>
	);
};

export default auth;
