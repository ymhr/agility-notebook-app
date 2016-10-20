import React, {Component} from 'react';
import routes from '../routes';
import {Header, Menu, Button} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import {observer} from 'mobx-react';

@observer(['auth'])
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
                ...menu
        ]

        return (

            <header>
                <Button size="mini" floated="right" onClick={this.logout}>Logout</Button>
                <Header as="h1">
                    Agility Notebook test
                    <Header.Subheader>Makes notes and stuff</Header.Subheader>
                </Header>

                <Menu>
                    {menu}
                </Menu>
            </header>

        );

    }

}

export default HeaderContainer;
