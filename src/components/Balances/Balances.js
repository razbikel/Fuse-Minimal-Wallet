import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Token from './Token';
import history from '../../history';

class Balances extends Component{

    toggleAddToken = () => {
        history.push('/add-token')
    }

    render(){
        const tokens = this.props.accountTokens.tokens;
        return(
            <div>
                <div>
                    <br />
                    <br />
                    {
                        tokens === undefined || this.props.accountTokens.status === 'fetching' ?
                            <div>fetchinig...</div>  :
                            tokens.map((token, index) => {
                                return <Token token={token} key={index}/>
                            })   
                    }
                </div>
                <br />
                <Button className={"button1"} onClick={this.toggleAddToken}>add token</Button>
            </div>
        )
    }
}

export default connect(
    ({ account, accountTokens }) => ({ account, accountTokens }),
    null
)(Balances);