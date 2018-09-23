import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
export default ({ route }) => {
	return (
		<div>
			<ul>
				<NavLink to="/">首页</NavLink>
				<NavLink to="/todo">待办</NavLink>
				<NavLink to="/contact">联系我们</NavLink>
				<NavLink to="/notfound">404</NavLink>
			</ul>
			{
				renderRoutes(route.routes)
			}
		</div>
	);
};

