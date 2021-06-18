import  React, {Component} from 'react';

import './Transfer.css'

class TransferTicket extends Component{

    render(){
        //console.log(this.props.transfer)
        return(
            <div >
                {
                    this.props.transfer !== undefined ? 
                        <div>
                            <div>from: {this.props.transfer.from}</div>
                            <div>to: {this.props.account}</div>
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default TransferTicket;