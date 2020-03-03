import React from 'react';

export default class ProfilePhotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photoKeys: []
        }
    }

    async componentDidMount() {
        const response = await fetch(`/get-photos/${this.props.nick}`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        });
        const data = await response.json();
        this.setState({
            photoKeys: data.photoKeys
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.photoKeys
                        .map((photoId, index) =>
                            (<img src={`/get-photo/${this.props.nick}/${photoId}`} key={index} width="275" height="255" alt=""></img>)
                        )
                }
            </div>
        )
    }
}