import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    paper : {
        background: '#fff',
        padding: '10px'
    },
    even : {
        marginRight: '10px',
        borderBottom: '1px solid #ddd',
        listStyle: 'none',
        marginBottom: '10px'
    },
    odd : {
        marginLeft: '10px',
        borderBottom: '1px solid #ddd',
        listStyle: 'none',
        marginBottom: '10px'
    },
    username : {
        fontStyle: 'italic'
    },
    message : {
        fontSize: '12px'
    },
    blue : {
        color: '#2196f3'
    },
    loader : {
        paddingTop: '230px',
        textAlign: 'center'
    }
}

class ChatWindow extends Component {
    render() {
        if (this.props.messages.length) {
        return (
            <div>
                <ul>
                    {this.props.messages.map((message, index) => (
                    <li style={ (index % 2 === 0) ? styles.even : styles.odd} key={index}>
                        <Paper style={styles.paper} >
                            <span style={styles.username}>{message.senderId}</span>-
                            <p style={styles.message}>{message.text}</p>
                        </Paper>
                    </li>
                    ))}
                </ul> 
            </div>
        )
        } else {
            return <div style={styles.loader}><CircularProgress style={styles.blue} /></div>
        }
    }
}

export default ChatWindow;