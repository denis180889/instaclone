import React from 'react';

export default class ProfileAvatar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            avatar: false
        }
        this.isAvatarExist = this.isAvatarExist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    async componentDidMount() {
        const response = await fetch(`/get-avatar/${this.props.nick}`);
        this.setState({
            avatar: Boolean(response),
        });
    }

    isAvatarExist() {
        return this.state.avatar;
    }

    async handleSubmit() {
        const formData = new FormData();
        formData.append('avatar', this.fileInput.current.files[0]);

        const response = await fetch(`/add-avatar/${this.props.nick}`, {
            method: 'POST',
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
            <div>
                {this.isAvatarExist() ? (
                    <img src={`/get-avatar/${this.props.nick}`} alt="" width="250" height="255"></img>
                ) : (
                        <form className="container container-column"
                            onSubmit={this.handleSubmit}>
                            <input
                                type="file"
                                ref={this.fileInput}
                            />
                            <input type="submit" value="Upload avatar" />
                        </form>
                    )
                }
            </div>
        )
    }
}