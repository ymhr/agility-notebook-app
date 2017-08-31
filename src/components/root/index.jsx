import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container} from 'semantic-ui-react';
import {Route, Link, BrowserRouter as Router} from 'react-router';
import routes, {routeElements} from '../routes.js';

import HeaderContainer from './header';

import styles from './styles.css'

@observer
class Root extends Component {

    render() {
        console.log(routeElements());
        return (
            <div>
                <HeaderContainer />
                <Container className={styles.main}>
                    {/* {this.props.children} */}
                     <Router>
                        {routeElements()}
                    </Router>
                </Container>
            </div>
        );
    }
}

export default Root;