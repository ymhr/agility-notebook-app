import auth from './auth';
import profile from './profile';
import dogs from './dogs';
import shows from './shows';
import settings from './settings';
import app from './app';

import {when, observable} from 'mobx';

const store = {
    auth,
    profile,
    dogs,
    shows,
    settings,
    app
};

export default store;
