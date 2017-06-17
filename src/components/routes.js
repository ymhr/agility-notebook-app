import Root from './root/index';
import Shows from './shows/index';
import ViewShow from './shows/view';
import EditShow from './shows/edit';
import Profile from './profile/index';
import Dogs from './dogs/index';
import EditDog from './dogs/edit';
import Settings from './settings/index';
import EditRun from './shows/runs/edit';
import Printable from './printable/index';

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
					{path: ':id', component: ViewShow, label: 'View show', childRoutes: [
						{path: 'run/add', component: EditRun, label: 'Add run'},
						{path: 'run/:runId', component: EditRun, label: 'Edit run'}
					]},
					{path: ':id/printable', component: Printable, hideFromNav: true}
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
		]
	}
];

export default routes;
