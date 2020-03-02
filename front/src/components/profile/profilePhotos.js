import React from 'react';

export default class ProfilePhotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photoKeys: []
        }
    }

    async componentDidMount() {
        const respose = await fetch(`http://localhost:3000/get-photos/${this.props.nick}`);
        const data = await respose.json();
        this.setState({
            photoKeys: data.photoKeys
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.photoKeys
                        .map(photoId =>
                            (<img src={`http://localhost:3000/get-photo/${this.props.nick}/${photoId}`} width="275" height="255" alt=""></img>)
                        )
                }
            </div>
        )
    }
}