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
      height: '356px',
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

class UsersList extends Component {

  render() {
    if (this.props.users) {
      return  <List component="nav"  style={styles.userList}>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <ListItem style={styles.highlighted} key={user.id} button>
                <ListItemText primary={
                  <Typography style={styles.white}>{user.name}</Typography>
                  }/>
              </ListItem>
            )
          }
          return (
            <ListItem style={styles.list}  key={user.id} button>
                <ListItemText primary={
                  <Typography style={styles.blue}>{user.name}</Typography>
                  }/>
              </ListItem>
          )
        })}
      </List>
    } else {
      return <div style={styles.loader}><CircularProgress style={styles.blue} /></div>
    }
  }
}

export default UsersList;