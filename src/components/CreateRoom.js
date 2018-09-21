import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    button : {
        background: '#2196f3',
        color: '#fff',
        marginBottom: '12px'
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
    formControl : {
        width: '200px'
    },
    buttonCreate : {
        background: '#2196f3',
        color: '#fff',
        marginLeft: '12px'
    },
    error : {
        color: 'red'
    }
  };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
    },
},
};
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: 'absolute',
      width:  '500px',
      maxWidth: '90%',
      backgroundColor: '#fff',
      padding: '20px'
    };
  }


class CreateRoom extends Component {
    constructor (props) {
        super();

        this.state = {
            open: false,
            newRoomName: '',
            error: '',
            name: [],
        }
    }

    createRoomOpenModal(e) {
        e.preventDefault();
        this.setState({
            open: true,
            error: '',
            name: []
        })
    }

    handleCreateRoom(e) {
        e.preventDefault();
        if (this.state.newRoomName) {
            this.props.onCreateRoom(this.state.newRoomName,this.state.name);
            this.setState({
                open : false
            });
        } else {
            this.setState({
                error : 'Room Name cant be empty'
            });
        }
    }

    handleNewRoomName(e) {
        this.setState({
            error : ''
        });
        this.setState({newRoomName: e.target.value});
    }

    createRoomCloseModal = () => {
        this.setState({ open: false });
    };

    handleSelectChange = event => {
        this.setState({ name: event.target.value });
    };

    render() {
        const currentUser = this.props.currentUser || {};
        const users = Object.keys(currentUser).length ? currentUser.users : [];
        const currentUserId = Object.keys(currentUser).length ? currentUser.id : '';

        return (
            <React.Fragment>
                <Button style={styles.button} onClick={this.createRoomOpenModal.bind(this)} variant="extendedFab" aria-label="Create Room">
                    <AddIcon />
                    Create Room
                </Button>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.createRoomCloseModal}
                    >
                    <div style={getModalStyle()}>
                        <Typography variant="title" id="modal-title">
                        Create Room
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                            Enter Room Name & select users to the new room
                        </Typography>


                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Select Users</InputLabel>
                            <Select
                                multiple
                                value={this.state.name}
                                onChange={this.handleSelectChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {users.map(user => (
                                    (currentUserId !== user.id) ? (
                                        <MenuItem key={user.id} value={user.id}>
                                        <Checkbox checked={this.state.name.indexOf(user.id) > -1} />
                                        <ListItemText primary={user.name} />
                                    </MenuItem>)
                                    : ''
                                
                                ))}
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="new-room-name">Enter new room name</InputLabel>
                            <Input
                                id="new-room-name"
                                placeholder="Enter new room name"
                                onChange={this.handleNewRoomName.bind(this)}
                                value={this.state.newRoomName} />
                            {this.state.error &&
                                <FormHelperText style={styles.error} id="name-error-text">{this.state.error}</FormHelperText>
                            }
                        </FormControl>
                        <Button style={styles.buttonCreate} variant="contained" onClick={this.handleCreateRoom.bind(this)}>
                            Create Room
                        </Button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default (CreateRoom);