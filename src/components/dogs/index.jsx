import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {List, Button, Header, Form, Icon} from 'semantic-ui-react';
import {hashHistory, Link} from 'react-router';

import Dog from '../../store/models/dog';

@inject('dogs')
@observer
class Dogs extends Component {

    openAddDog = () => {
        hashHistory.push('/dogs/add');
    };

    viewDog = (id) => {
      hashHistory.push(`/dogs/${id}/edit`)
    };

    render(){
        if(!this.props.children){
            return(

                <div>
                    <br />
                    <Header as="h3">Your dogs</Header>
                    <Button onClick={this.openAddDog} fluid><Icon name="plus" />Add dog</Button>

                    <List selection>
                        {this.props.dogs.items.map(d => {
                           return (
                               <List.Item key={d.id} onClick={this.viewDog.bind(null, d.id)}>
                                   <List.Header>{d.name}</List.Header>
                                   <List.Content>
                                       <div><strong>Grade:</strong> {d.grade}</div>
                                   </List.Content>
                               </List.Item>
                           )
                        })}
                    </List>

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
