import Root from './root/index';
import Shows from './shows/index';
import ViewShow from './shows/view';
import EditShow from './shows/edit';
import Profile from './profile/index';
import Dogs from './dogs/index';
import EditDog from './dogs/edit';
import Settings from './settings/index';

const routes = [
	{
		path: '/',
		component: Root,
		label: 'Shows',
		indexRoute: {component: Shows},
		childRoutes: [
			{
				path: '/shows', component: Shows, hideFromNav: true, childRoutes: [
					{path: 'add', component: EditShow, label: 'Add show'},
					{path: ':id/edit', component: EditShow, label: 'Edit show'},
					{path: ':id', component: ViewShow, label: 'View show'}
			]
			},
			{path: '/profile', component: Profile, label: 'Profile'},
			{
				path: '/dogs', component: Dogs, label: 'Dogs', childRoutes: [
					{path: 'add', component: EditDog, label: 'New Dog'},
					{path: ':id/edit', component: EditDog, label: 'Edit dog'},
					// {path: ':id', component: ViewDog, label: 'View Dog'}
			]
			},
			{path: '/settings', component: Settings, label: 'Settings'}
		]
	}
];

export default routes;
