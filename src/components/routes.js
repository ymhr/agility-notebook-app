import React from 'react';
import {Route, withRouter} from 'react-router-dom'
import Loadable from 'react-loadable';

const Loading = (
	<h4>Loading...</h4>
);

const Root = Loadable({
	loader: () => import('./root/index'),
	loading() {
		return <div>Loading...</div>;
	}
});

const Shows = Loadable({
	loader: () => import('./shows/index'),
	loading() {
		return <div>Loading...</div>;
	}
});

const ViewShow = Loadable({
	loader: () => import('./shows/view'),
	loading() {
		return <div>Loading...</div>;
	}
});

const EditShow = Loadable({
	loader: () => import('./shows/edit'),
	loading() {
		return <div>Loading...</div>;
	}
});

const Profile = Loadable({
	loader: () => import('./profile/index'),
	loading() {
		return <div>Loading...</div>;
	}
});

const Dogs = Loadable({
	loader: () => import('./dogs/index'),
	loading() {
		return <div>Loading...</div>;
	}
});

const EditDog = Loadable({
	loader: () => import('./dogs/edit'),
	loading() {
		return <div>Loading...</div>;
	}
});

const Settings = Loadable({
	loader: () => import('./settings/index'),
	loading() {
		return <div>Loading...</div>;
	}
});

const EditRun = Loadable({
	loader: () => import('./shows/runs/edit'),
	loading() {
		return <div>Loading...</div>;
	}
});

const routes = [
	{
		path: '/shows', component: Shows, label: 'Shows', childRoutes: [
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
	return flatRoutes.map((route, i) => <Route key={i} path={route.path} component={route.component} exact={route.exact} />);
};

const flattenRoutes = (r, parentPath = '') => {
	return r.reduce((flat, route) => {
		const leadingSlash = parentPath ? '/' : '';
		const path = parentPath + leadingSlash + route.path;
		flat.push({path, component: route.component, exact: route.exact ||true});

		if(route.childRoutes && route.childRoutes.length) flat = flat.concat(flattenRoutes(route.childRoutes, path));

		return flat;
	}, []);
};

export default routes;
