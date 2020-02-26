import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            data: undefined,
            error: false,
            authorized: false,
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
            this.setState({
                data: data,
                authorized: true
            });
        }
        else {
            this.setState({
                error: true
            });
        }
    }

    render() {
        if (this.state.authorized) {
            return (
                <div>
                    <h1>Hey {this.state.data.user.nick}, nice to see you</h1>
                </div >
            )
        }
        if (!this.state.authorized) {
            return (
                <div>
                    <form onSubmit={this.signIn}>
                        <h1>Welcome to Instaclone</h1>
                        <input type="text" name="nick" value={this.state.nick} onChange={this.handleChangeNick}></input>
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChangePassword}></input>
                        <input type="submit" value="Sign In" />

                    </form>
                    {this.state.error &&
                        <p>Credentials are not right!</p>
                    }
                </div >
            );
        }
    }
}