import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Show from './show';
import {Button, Icon} from 'semantic-ui-react';
import {hashHistory} from 'react-router';

@observer(['shows'])
class Shows extends Component {

	componentWillMount(){
		this.props.shows.load();
	}

	openCreate = () => {
		hashHistory.push('/shows/add');
	};

    render(){

        let content = this.props.children;

        if(!this.props.children){
            content = (
            	<div>
					<Button fluid content="Add show" icon="plus" onClick={this.openCreate} />
					<br />
					{this.props.shows.items.map(s => {
						return <Show key={s.id} show={s} />;
					})}
				</div>
			);
        }

        return(

            <div>
                <h1>Shows</h1>
                {content}
            </div>

        );
    }

}

export default Shows;
