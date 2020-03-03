import React from 'react';

export default class ProfileAbout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: undefined,
            about: ""
        }
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

    render() {
        return (
            <div>
                <p>NAME: {this.state.name}</p>
                <p>AGE: {this.state.age}</p>
                <p>ABOUT: {this.state.about}</p>
            </div>
        )
    }
}