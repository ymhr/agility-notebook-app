import React, {Component} from 'react';
import {observer} from 'mobx-react';

import HeaderContainer from './header';

@observer(['global'])
class Root extends Component {

    render() {
        return (
            <span>
                <HeaderContainer />

                {this.props.children}
            </span>
        );
    }
}

export default Root;