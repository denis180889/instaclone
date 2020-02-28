import React from 'react';

export default class LoginForm extends React.Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.signIn}>
                    <h1>Welcome to Instaclone</h1>
                    <input type="text" name="nick" value={this.props.nick} onChange={this.props.handleChangeNick}></input>
                    <input type="text" name="password" value={this.props.password} onChange={this.props.handleChangePassword}></input>
                    <input type="submit" value="Sign In" />
                </form>
            </div >
        )
    }
}