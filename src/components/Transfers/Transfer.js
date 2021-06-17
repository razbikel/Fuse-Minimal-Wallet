import  React, {Component} from 'react';

class Transfer extends Component{

    render(){
        const transfer = this.props.transfer;
        return (
            <div>{transfer.value} &nbsp;&nbsp;&nbsp;{transfer.gasPrice}</div>
        )
    }

}

export default Transfer;
