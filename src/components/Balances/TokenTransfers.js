import  React, {Component} from 'react';
import Transfer from '../Transfers/Transfer'
import {Button} from 'react-bootstrap';
import history from '../../history';

class TokenTransfers extends Component{

    back = () =>{
        history.goBack();
    }

    render(){
        return(
            <div>
                <h2>token trasnfers</h2>
                {
                    this.props.location.state.transfers.map((transfer, index) => {
                        return <Transfer transfer={transfer} key={index}/>
                    }) 
                }
                <Button onClick={this.back}>back</Button>
            </div>
        )
    }
}

export default TokenTransfers;