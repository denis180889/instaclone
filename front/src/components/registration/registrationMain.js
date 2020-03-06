import React from 'react';


export default class RegistrationMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nick: "",
            password: "",
            name: "",
            age: undefined,
            about: ""
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
    }

    handleChangeNick(event) {
        this.setState({ nick: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeAge(event) {
        this.setState({ age: event.target.value });
    }

    handleChangeAbout(event) {
        this.setState({ about: event.target.value });
    }

    async handleSave() {
        await fetch("/create-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: this.state.nick,
                password: this.state.password,
                name: this.state.name,
                age: this.state.age,
                about: this.state.about,
            })
        });
        this.props.finishRegistration();
    }

    render() {
        return (
            <div>
                <ul className="container container-column">
                    <li className="container container-row">
                        <label className="item-label">NICK:</label>
                        <input className="item-value" type="text" onChange={this.handleChangeNick}></input>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">PASSWORD:</label>
                        <input className="item-value" type="text" onChange={this.handleChangePassword}></input>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">NAME:</label>
                        <input className="item-value" type="text" onChange={this.handleChangeName}></input>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">AGE:</label>
                        <input className="item-value" type="text" onChange={this.handleChangeAge}></input>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">ABOUT:</label>
                        <input className="item-value" type="text" onChange={this.handleChangeAbout}></input>
                    </li>
                    <li className="container container-row">
                        <button onClick={this.handleSave}>Save</button>
                    </li>
                </ul>
            </div>
        )
    }
}