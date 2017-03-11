import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Button, Header, Form} from 'semantic-ui-react';
import {hashHistory, Link} from 'react-router';

import Dog from '../../store/models/dog';

@inject('dogs')
@observer
class Dogs extends Component {

    openAddDog = () => {
        hashHistory.push('/dogs/add');
    };

    render(){
        if(!this.props.children){
            return(

                <div>
                    <br />
                    <Header as="h3">Your dogs</Header>
                    <Button onClick={this.openAddDog}>Add dog</Button>

                    <ul>
                        {this.props.dogs.items.map(d => <li key={d.id}><Link to={`/dogs/${d.id}/edit`}>{d.name}</Link></li>)}
                    </ul>

                </div>

            );
        } else {
            return(
                <div>{this.props.children}</div>
            );
        }


    }

}

export default Dogs;
