import  React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';

import './Balances.css'

class ConfirmAddToken extends Component{

    back = () => {
        //history.push('/add-token')
        history.goBack();
    }

    error = () => {
        const error = this.state.show_message ? <div className="error">{this.state.message}</div> : null;
        return error;
    }

    render(){
        return(
            <div className="container">
                <h2>add token confirm</h2>
                <Button onClick={this.back}>back</Button>
                <Button>next</Button>
        </div>
        )
    }
}

export default connect(
    ({ accountTokens }) => ({  accountTokens }),
    null
)(ConfirmAddToken);