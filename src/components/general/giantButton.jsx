import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

import styles from './styles.css'

class GiantButton extends Component {

    render(){
        return(
            <div className={styles.giantButtonWrapper}>
                <button className={styles.giantButton} onClick={this.props.onClick}>
                    <h3 className={styles.title}>{this.props.title}</h3>
                    <Icon name={this.props.icon} className={styles.icon} />
                    <p className={styles.description}>{this.props.description}</p>
                </button>
            </div>
        );
    }

}

export default GiantButton;