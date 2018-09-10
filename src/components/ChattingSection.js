import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import UsersList from './UsersList';
import SendMessageForm from './SendMessageForm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chat from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Chatkit from '@pusher/chatkit';

const styles = {
    chatWindow : {
        background: '#dff1ff',
        height: '515px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '12px'
    },
    button : {
        background: '#2196f3',
        color: '#fff',
        marginBottom: '12px'
    },
    logo : {
        fontSize: '50px',
        color: '#2196f3',
        margin: '0 0 60px'
    }
  };

class ChattingSection extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        currentRoom:  PropTypes.object,
        messages: PropTypes.array
      };

    constructor (props) {
        super();

        this.state = {
            currentUser: {},
            messages: [],
            update: true,
            newRoom: true,
            roomId: 15412514
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(text) {
        console.log(text)
        this.props.currentUser.sendMessage({
            text,
            roomId: this.props.roomId ?this.props.roomId : 15412514
        })

        this.props.dispatch({
            type: 'GET_CHAT',
            roomId: this.props.roomId ?this.props.roomId : 15412514,
            currentUser: this.props.currentUser
        });

        this.setState({
            update:true
        })
    }

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_CURRENT_USER',
            currentUser: this.props.username
        });

        this.setState({
            newRoom:true
        })
    }

    createRoom(e) {
        e.preventDefault();
        const roomName = window.prompt('Enter Room Name');
        this.props.dispatch({
            type: 'GET_CREATE_ROOM',
            currentUser: this.props.currentUser,
            roomName
        });
    }

    render() {
        const currentUser = this.props.currentUser || {};
        const users = currentUser ? currentUser.users : [];
        const messages = this.props.messages || [];

        if(users && users.length && (this.state.update === true || this.state.newRoom === true ) ){
            this.props.dispatch({
                type: 'GET_CHAT',
                roomId: this.props.roomId ? this.props.roomId : 15412514,
                currentUser: this.props.currentUser
            });

            this.setState({
                update:false,
                newRoom: false
            });
        }

        return (
            <React.Fragment>
                <Grid container spacing={24}>

                    <Grid item xs={8}>
                        <div  ref='scroll' style={styles.chatWindow}>
                            <ChatWindow
                                messages={messages}
                            />
                        </div>
                            <SendMessageForm 
                                onSubmit={this.sendMessage}
                            />

                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="title" style={styles.logo} color="inherit">capsule-chat <Chat style={styles.logo}/></Typography>
                        <Button style={styles.button} onClick={this.createRoom.bind(this)} variant="extendedFab" aria-label="Create Room">
                            <AddIcon />
                            Create Room
                        </Button>

                        <UsersList
                            currentUser={currentUser}
                            users={users}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    currentUser: state.currentUser,
    roomId: state.roomId
});

export default  connect(mapStateToProps) (ChattingSection);