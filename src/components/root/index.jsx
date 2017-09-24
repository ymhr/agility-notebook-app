import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container} from 'semantic-ui-react';
import {Route, Link, Switch} from 'react-router-dom';
import routes, {test, routeElements} from '../routes.js';

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
                    {/* <Switch> */}
                        {routeElements()}
                    {/* </Switch> */}
                </Container>
            </div>
        );
    }
}

export default Root;