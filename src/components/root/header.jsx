import React, {Component} from 'react';
import routes from '../routes';
import {Header, Menu, Button, Container} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import {observer, inject} from 'mobx-react';

import styles from './styles.css';

@inject('auth')
@observer
class HeaderContainer extends Component {

    clickMenuItem = (path) => {
        hashHistory.push(path);
    };

    logout = () => {
        this.props.auth.logout();
        window.location.reload();
    };

    render() {

        let menu = routes[0].childRoutes.map(item => {
            if(item.hideFromNav) return null;
            return (
                <Menu.Item key={Math.random()} onClick={this.clickMenuItem.bind(this, item.path)}>{item.label}</Menu.Item>
            );
        });

        menu = [
            <Menu.Item key={Math.random()} onClick={this.clickMenuItem.bind(this, routes[0].path)}>{routes[0].label}</Menu.Item>,
                ...menu,
            <Menu.Item key={Math.random()} onClick={this.logout} position="right">Logout</Menu.Item>
        ];

        const navStyles = {
            backgroundColor: 'transparent',
            border: 0,
            boxShadow: 'none'
        };

        return (
            <div style={{marginBottom: 20}}>
                <header className={styles.header}>
                    <Container>
                        <Header as="h1">
                            Agility Notebook
                            <Header.Subheader>Makes notes and stuff</Header.Subheader>
                        </Header>
                    </Container>

                </header>

                <nav className={styles.nav}>
                    <Container>
                        <Menu style={navStyles}>
                            {menu}
                        </Menu>
                    </Container>
                </nav>

            </div>
        );

    }

}

export default HeaderContainer;
