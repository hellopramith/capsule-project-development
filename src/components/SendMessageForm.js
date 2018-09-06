import React, { Component } from 'react'

const styles = {
    chatText : {
        border: '3px solid #ddd',
        padding: '20px 10px 40px',
        borderRadius: '0 0 25px 0',
        width: '100%',
        boxSizing: 'border-box',
        outline: 'none'
    }
}

class SendMessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text:''
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.text);
        this.setState({ text: '' });
    }

    onChangeHandler(e) {
        this.setState({ text: e.target.value });
        
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {

        return (
            <form onSubmit={this.onSubmitHandler.bind(this)}>
                <input style={styles.chatText}
                    type="text"
                    placeholder="Type message & hit ENTER"
                    onChange={this.onChangeHandler.bind(this)}
                    value={this.state.text}
                />
            </form>
        )
    }
}

export default SendMessageForm;