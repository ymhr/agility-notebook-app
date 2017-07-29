import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container} from 'semantic-ui-react';

import HeaderContainer from './header';

@observer
class Root extends Component {

    render() {
        return (
            <div>
                <HeaderContainer />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default Root;