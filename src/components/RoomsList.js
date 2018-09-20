import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
  list : {
    background: '#eee',
    cursor: 'default',
    border: '1px solid #2196f3',
    float: 'left',
    width: 'auto',
    margin: '2px',
    borderRadius: '30px'
  },
  highlighted : {
    background: '#2196f3',
    color: '#fff',
    cursor: 'default',
    border: '1px solid #2196f3',
    float: 'left',
    width: 'auto',
    margin: '2px',
    borderRadius: '30px'
  },
  userList : {
      height: '156px',
      overflowY: 'auto'
  },
  white : {
    color: '#fff'
  },
  blue : {
    color: '#2196f3'
  },
  loader : {
    paddingTop: '130px',
    textAlign: 'center'
  }
}

class RoomsList extends Component {

  switchRoom(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    this.props.onRoomUpdate(id);
  }

  render() {
    if (this.props.rooms.length) {
      return  <div><Typography>Room List</Typography><List component="nav"  style={styles.userList}>
        {this.props.rooms.map((room, index) => {
          if (room.id === this.props.currentRoomId) {
            return (
              <ListItem style={styles.highlighted} key={room.id} button>
                <ListItemText primary={
                  <Typography style={styles.white}>{room.name}</Typography>
                  }/>
              </ListItem>
            )
          }
          return (
            <ListItem style={styles.list}  key={room.id} button data-id={room.id} onClick={this.switchRoom.bind(this)}>
                <ListItemText data-id={room.id}  primary={
                  <Typography data-id={room.id}  style={styles.blue}>{room.name}</Typography>
                  }/>
              </ListItem>
          )
        })}
      </List>
      </div>
    } else {
      return <div style={styles.loader}><CircularProgress style={styles.blue} /></div>
    }
  }
}

export default RoomsList;