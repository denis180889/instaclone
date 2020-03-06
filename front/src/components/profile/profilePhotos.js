import React from 'react';

export default class ProfilePhotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photoKeys: [],
            avatar: false
        }
        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit() {
        const formData = new FormData();
        formData.append('photos', this.fileInput.current.files[0]);

        const response = await fetch(`/add-photos/${this.props.nick}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + this.props.token
            },
            body: formData
        })

        if (response.ok) {
            this.setState({
                avatar: true
            });
        }
    }

    render() {
        return (
            <div >
                <hr></hr>
                <div className="container container-wrap">
                    {
                        this.state.photoKeys
                            .map((photoId, index) =>
                                (<img className="item-margin" src={`/get-photo/${this.props.nick}/${photoId}`} key={index} width="275" height="255" alt=""></img>)
                            )
                    }
                    <form className="container container-column"
                        onSubmit={this.handleSubmit}>
                        <input
                            type="file"
                            ref={this.fileInput}
                        />
                        <input type="submit" value="Upload photo" />
                    </form>

                </div>
            </div>
        )
    }
}