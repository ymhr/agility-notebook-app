import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Button, Header, Form} from 'semantic-ui-react';
import {hashHistory, Link} from 'react-router';

import Dog from '../../store/dog';

@observer(['dogs'])
class Dogs extends Component {

    openAddDog = () => {
            hashHistory.push('/dogs/create');
    };

    render(){

        return(

            <div>
                <br />
                <Header as="h3">Your dogs</Header>
                <Button onClick={this.openAddDog}>Add dog</Button>

                <ul>
                    {this.props.dogs.dogs.map(d => <li key={d.id}><Link to={`/dogs/edit/${d.id}`}>{d.name}</Link></li>)}
                </ul>

                {this.props.children}

            </div>

        );
    }

}

export default Dogs;
