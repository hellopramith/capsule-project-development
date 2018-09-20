import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import UsersList from './UsersList';
import RoomsList from './RoomsList';
import CreateRoom from './CreateRoom';
import SendMessageForm from './SendMessageForm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Chat from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const styles = {
    chatWindow : {
        background: '#fff',
        height: '515px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '12px'
    },
    buttonLogout : {
        color: '#f50057',
        marginBottom: '12px'
    },
    logo : {
        fontSize: '50px',
        color: '#2196f3',
        margin: '0 0 60px'
    },
  };



class ChattingSection extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        currentRoom:  PropTypes.object,
        messages: PropTypes.array,
      };

    constructor (props) {
        super();

        this.state = {
            currentUser: {},
            messages: [{
                text: 'Welcome to the new chat room -',
                senderId: ''
            }],
            update: true,
            roomId: '',
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('screen');
        window.location.reload();
    }

    sendMessage(text) {
        this.props.currentUser.sendMessage({
            text,
            roomId: this.props.roomId ?this.props.roomId : 16408493
        })
    }

    handleCreateRoom(roomName,addUserIds){
        this.setState({
            update:true,
            messages: [{
                text: 'Welcome to the new chat room -',
                senderId: ''
            }],
        });
        this.props.dispatch({
            type: 'GET_CREATE_ROOM',
            currentUser: this.props.currentUser,
            roomName,
            addUserIds
        });
    }

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_CURRENT_USER',
            currentUser: this.props.username
        });
        
    }

    onRoomUpdate(id){
        this.props.dispatch({
            type: 'UPDATE_ROOM_ID',
            roomId: parseInt(id,10),
        });

        this.setState({
            update:true,
            messages: [{
                text: 'Welcome to the new chat room -',
                senderId: ''
            }]
        });
    }

    loadMsg(currentUser, roomId) {
        return currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message],
                      })
                }
            },messageLimit: 5
            })
    }

    render() {
        const currentUser = this.props.currentUser || {};
        const users = Object.keys(currentUser).length ? currentUser.users : [];
        const rooms = Object.keys(currentUser).length ? currentUser.rooms : [];
        const currentUserId = Object.keys(currentUser).length ? currentUser.id : '';
        const roomId = this.props.roomId || 16408493;
        if(currentUser && currentUser.subscribeToRoom && (this.state.update === true && roomId !== this.state.roomId)) {
            this.loadMsg(currentUser, roomId);
            this.setState({
                update:false,
                roomId: roomId,
                currentUserId: currentUserId,
                open: false
            });
        }

        return (
            <React.Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={8}>
                        <div  ref='scroll' style={styles.chatWindow}>
                            <ChatWindow
                                currentUserId = {currentUserId}
                                messages={this.state.messages}
                            />
                        </div>
                        <SendMessageForm 
                            onSubmit={this.sendMessage}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="title" style={styles.logo} color="inherit">capsule-chat <Chat style={styles.logo}/></Typography>

                        <CreateRoom  currentUser={currentUser} onCreateRoom={this.handleCreateRoom} />

                        <Button style={styles.buttonLogout} onClick={this.logOut.bind(this)}>
                            <PowerSettingsNew />
                            Logout
                        </Button>
                        <RoomsList
                            onRoomUpdate = {this.onRoomUpdate.bind(this)}
                            currentRoomId={this.state.roomId}
                            rooms={rooms}
                        />
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
    currentUser: state.currentUser,
    roomId: state.roomId
});

export default  connect(mapStateToProps) (ChattingSection);