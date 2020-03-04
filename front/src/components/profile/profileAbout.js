import React from 'react';

export default class ProfileAbout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            name: "",
            age: undefined,
            about: ""
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
        this.isEditMode = this.isEditMode.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`/get-user/${this.props.nick}`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }
        );
        const data = await response.json();
        this.setState({
            name: data.name,
            age: data.age,
            about: data.about
        });
    }

    handleEdit() {
        this.setState({
            editMode: true
        })
    }

    async handleSave() {
        await fetch(`/edit-user/${this.props.nick}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.props.token
            },
            body: JSON.stringify({
                name: this.state.name,
                age: this.state.age,
                about: this.state.about,
            })
        });

        this.setState({
            editMode: false
        })
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

    isEditMode() {
        return this.state.editMode;
    }

    render() {
        return (
            <div>
                <ul className="container container-column">
                    <li className="container container-row">
                        {!this.isEditMode() && <button onClick={this.handleEdit}>Edit</button>}
                        {this.isEditMode() && <button onClick={this.handleSave}>Save</button>}
                    </li>
                    <li className="container container-row">
                        <label className="item-label">NAME:</label>
                        {this.isEditMode() ? (
                            <input className="item-value" type="text" defaultValue={this.state.name} onChange={this.handleChangeName}></input>
                        ) : (
                                <span className="item-value">{this.state.name}</span>
                            )}
                    </li>
                    <li className="container container-row">
                        <label className="item-label">AGE:</label>
                        {this.isEditMode() ? (
                            <input className="item-value" type="text" defaultValue={this.state.age} onChange={this.handleChangeAge}></input>
                        ) : (
                                <span className="item-value">{this.state.age}</span>
                            )}
                    </li>
                    <li className="container container-row">
                        <label className="item-label">ABOUT:</label>
                        {this.isEditMode() ? (
                            <input className="item-value" type="text" defaultValue={this.state.about} onChange={this.handleChangeAbout}></input>
                        ) : (
                                <span className="item-value">{this.state.about}</span>
                            )}
                    </li>
                </ul>
            </div >
        )
    }
}