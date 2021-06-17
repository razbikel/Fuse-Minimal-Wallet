import  React, {Component} from 'react';

class Token extends Component{

    render(){
        const token = this.props.token;
        console.log(token)
        return (
            <div>token</div>
        )
    }

}

export default Token;
