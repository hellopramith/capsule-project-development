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
            messages: []
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
    }

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_CHAT',
            userId: this.props.username
        });
        
        // const chatManager = new Chatkit.ChatManager({
        //     instanceLocator: 'v1:us1:4b9830d2-44d5-464b-8a84-225ed473b5ba',
        //     userId: this.props.username,
        //     tokenProvider: new Chatkit.TokenProvider({
        //         url: 'http://localhost:3001/authenticate'
        //     })
        // })

        // chatManager.connect()
        // .then(currentUser => {
        //   this.setState({ currentUser })
        //   return currentUser.subscribeToRoom({
        //     roomId: 15412514,
        //     messageLimit: 100,
        //     hooks: {
        //       onNewMessage: message => {
        //         this.setState({
        //           messages: [...this.state.messages, message],
        //         })
        //       },
        //       onUserCameOnline: () => this.forceUpdate(),
        //       onUserWentOffline: () => this.forceUpdate(),
        //       onUserJoined: () => this.forceUpdate()
        //     }
        //   })
        // })
        // .then(currentRoom => {
        //   this.setState({ currentRoom })
        // })
        // .catch(error => console.error('error', error))
    }

    createRoom(e) {
        e.preventDefault();
        alert('Functionality under development');
    }

    render() {
        console.log('here')
        const currentUser = this.props.currentUser || this.state.currentUser;
        const users = currentUser ? currentUser.users : [];
        const messages = this.props.messages || this.state.messages;
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
    currentRoom: state.currentRoom,
    currentUser: state.currentUser
});

export default  connect(mapStateToProps) (ChattingSection);