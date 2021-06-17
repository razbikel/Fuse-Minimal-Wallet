import  React, {Component} from 'react';

class Token extends Component{

    getTokenRealValue = (balance, decimals) => {
        return parseFloat(balance) / (Math.pow(10, parseFloat(decimals)));
    }

    render(){
        const token = this.props.token;
        return (
            <div>{this.getTokenRealValue(token.balance, token.decimals)} &nbsp;&nbsp;&nbsp;{token.symbol}</div>
        )
    }

}

export default Token;
