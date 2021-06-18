import  React, {Component} from 'react';
import Transfer from '../Transfers/Transfer'
import {Button} from 'react-bootstrap';
import history from '../../history';

class TokenTransfers extends Component{

    back = () =>{
        history.goBack();
    }

    render(){
        const transfers =  this.props.location.state.transfers;
        return(
            <div>
                <h2>{this.props.location.state.symbol} trasnfers</h2>
                {
                    transfers !== undefined ? 
                        this.props.location.state.transfers.map((transfer, index) => {
                            return <Transfer transfer={transfer} key={index}/>
                        }) : <div>You dont have any transfers for {this.props.location.state.symbol}</div>
                }
                <Button onClick={this.back}>back</Button>
            </div>
        )
    }
}

export default TokenTransfers;