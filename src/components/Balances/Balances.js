import  React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Token from './Token';
import history from '../../history';

class Balances extends Component{

    toggleAddToken = () => {
        history.push(`/add-token?address=${this.props.account.accountAddress}`)
    }

    render(){
        const tokens = this.props.tokens;
        return(
            <div>
                <div>
                    {
                        tokens === undefined || this.props.accountTokens.status === 'fetching' ?
                            <div>fetchinig...</div>  :
                            this.props.accountTokens.status === 'fetching' ?
                            <div>fetchinig...</div>  :
                            this.props.accountTokens.status === 'error' && tokens === [] ? <div>{this.props.accountTokens.message}</div> :
                             tokens.length === 0 ? <div>No tokens found</div> :

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