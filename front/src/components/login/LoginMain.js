import React from 'react';
import LoginForm from './loginForm';
import LoginError from './loginError';

export default class LoginMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            data: undefined,
            error: false
        };

        this.signIn = this.signIn.bind(this);
        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeNick(event) {
        this.setState({ nick: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    signIn = async (e) => {
        e.preventDefault();

        const nickName = e.target.elements.nick.value;
        const pass = e.target.elements.password.value;

        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickName: nickName,
                pass: pass
            })
        });

        if (response.ok) {
            const data = await response.json();
            this.props.handleAuth(data.user.nick, data.token);
        }
        else {
            this.setState({
                error: true
            });
        }
    }

    render() {
        return (
            <div>
                <LoginForm
                    signIn={this.signIn}
                    nick={this.state.nick}
                    password={this.state.password}
                    handleChangeNick={this.handleChangeNick}
                    handleChangePassword={this.handleChangePassword}
                />
                {this.state.error &&
                    <LoginError />
                }
            </div >
        );
    }
}
