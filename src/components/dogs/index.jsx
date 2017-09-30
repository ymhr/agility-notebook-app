import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {List, Button, Header, Form, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import Dog from '../../store/models/dog';

@inject('dogs')
@observer
class Dogs extends Component {

    openAddDog = () => {
        console.log(this.props);
        this.props.history.push('/dogs/add');
    };

    viewDog = (id) => {
      this.props.history.push(`/dogs/${id}/edit`)
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
                                       <span><strong>Grade:</strong> {d.grade}</span>
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
