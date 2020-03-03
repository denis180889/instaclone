import React from 'react';
import EditableLabel from 'react-inline-editing';

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
                <ul className="container container-column">
                    <li className="container container-row">
                        <label className="item-label">NAME:</label>
                        <span className="item-value">{this.state.name}</span>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">AGE:</label>
                        <span className="item-value">{this.state.age}</span>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">ABOUT:</label>
                        <span className="item-value">{this.state.about}</span>
                    </li>
                    <li className="container container-row">
                        <label className="item-label">OTHER:</label>
                        <EditableLabel
                            text='rfefer'
                            inputClassName="item-value"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    </li>

                </ul>
            </div >
        )
    }
}