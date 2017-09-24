import React from 'react';
import {Route} from 'react-router-dom'
import Root from './root/index';
import Shows from './shows/index';
import ViewShow from './shows/view';
import EditShow from './shows/edit';
import Profile from './profile/index';
import Dogs from './dogs/index';
import EditDog from './dogs/edit';
import Settings from './settings/index';
import EditRun from './shows/runs/edit';

const routes = [
			{
				path: '/shows', component: Shows, hideFromNav: true, childRoutes: [
					{path: 'add', component: EditShow, label: 'Add show'},
					{path: ':id/edit', component: EditShow, label: 'Edit show'},
					{path: ':id', component: ViewShow, label: 'View show', childRoutes: [
						{path: 'run/add', component: EditRun, label: 'Add run'},
						{path: 'run/:runId', component: EditRun, label: 'Edit run'}
					]}
			]
			},
			{path: '/profile', component: Profile, label: 'Profile', hideFromNav: true},
			{
				path: '/dogs', component: Dogs, label: 'Dogs', childRoutes: [
					{path: 'add', component: EditDog, label: 'New Dog'},
					{path: ':id/edit', component: EditDog, label: 'Edit dog'}
			]
			},
			{path: '/settings', component: Settings, label: 'Settings'}
];



export const routeElements = () => {
	const flatRoutes = flattenRoutes(routes);
	flatRoutes.unshift({path: '/', exact: true, component: Shows, label: 'Home'});
	return flatRoutes.map((route, i) => <Route key={i} path={route.path} component={route.component} exact={route.exact} />).reverse();
};

// export const flatRoutes = () => {
// 	const flatRoutes = flattenRoutes(routes, '');
// 	flatRoutes.unshift({path: '/', exact: true, component: Shows, label: 'Home'});
// 	return flatRoutes;
// };
export const test = () => {
	console.log(flattenRoutes(routes));
};

const flattenRoutes = (r, parentPath = '') => {
	return r.reduce((flat, route) => {
		const leadingSlash = parentPath ? '/' : '';
		const path = parentPath + leadingSlash + route.path;
		flat.push({path, component: route.component, exact: route.exact ||false});

		if(route.childRoutes && route.childRoutes.length) flat = flat.concat(flattenRoutes(route.childRoutes, path));

		return flat;
	}, []);
}

// const flattenRoutes = (routeList, currentPath) => {
// 	return routeList.reduce((flatRoutes, r) => {
// 		const path = currentPath ? currentPath + '/' + r.path : r.path;
// 		const routeDefinition = {path, component: r.component, label: r.label, exact: r.exact || false};
// 		flatRoutes.push(routeDefinition);
		
// 		if(r.childRoutes && r.childRoutes.length){
// 			flatRoutes = flatRoutes.concat(flattenRoutes(r.childRoutes, routeDefinition.path));
// 		}

// 		return flatRoutes;

// 	}, []);
// };

export default routes;
