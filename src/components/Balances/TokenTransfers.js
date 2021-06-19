import  React, {Component} from 'react';
import Transfers from '../Transfers/Transfers';
import {Button} from 'react-bootstrap';
import history from '../../history';
import {connect} from 'react-redux';

import '../Main.css'
import './Balances.css'

class TokenTransfers extends Component{

    back = () =>{
        history.goBack();
    }

    render(){
        const transfers =  this.props.location.state.transfers;
        const tokenSymbol = this.props.location.state.symbol;
        const tokenBalance = this.props.location.state.balance;
        return(
            <div className="tt-container">
                <h4 className="account"><u>account:</u> {this.props.account.accountAddress}</h4>
                <hr />
                <h3 className="balance-fuse">{tokenBalance}&nbsp;&nbsp;{tokenSymbol} - trasnfers:</h3>
                <Transfers transfers={transfers}/>
                <br />
                <Button className="nav-button" onClick={this.back}>back</Button>
            </div>
        )
    }
}

export default connect(
    ({ account  }) => ({ account }),
    null
)(TokenTransfers);