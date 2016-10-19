import React, {Component} from 'react';
import {Container, Button, Header, Icon} from 'semantic-ui-react';

class Login extends Component {

    redirectToLogin = () => {
        const endPoint = apiUrl + '/auth/facebook';
        window.location.replace(endPoint);
    };

    render() {

        return (
                <Container textAlign="center">
                    <br /><br /><br />
                    <Header as="h1">You must log in to use this site.</Header>
                    <Button onClick={this.redirectToLogin} primary icon><Icon name="Facebook" />Login with Facebook</Button>
                </Container>
        );

    }

}

export default Login;
