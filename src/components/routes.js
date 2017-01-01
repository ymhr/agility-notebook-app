import Root from './root/index';
import Shows from './shows/index';
import CreateShow from './shows/create';
import ViewShow from './shows/view';
import Profile from './profile/index';
import Dogs from './dogs/index';
import CreateDog from './dogs/create';
import EditDog from './dogs/edit';

const routes = [
    {
        path: '/',
        component: Root,
        label: 'Shows',
        indexRoute: { component: Shows },
        childRoutes: [
            {path: '/shows', component:Shows, hideFromNav: true, childRoutes: [
                {path: 'add', component: CreateShow, label: 'Add show'},
                {path: ':id', component: ViewShow, label: 'View show'}
            ]},
            {path: '/profile', component: Profile, label: 'Profile'},
            {path: '/dogs', component: Dogs, label: 'Dogs', childRoutes: [
                {path: 'create', component: CreateDog, label: 'New Dog'},
                {path: 'edit/:id', component: EditDog, label: 'Edit dog'}
            ]},
        ]
    }
];

export default routes;
