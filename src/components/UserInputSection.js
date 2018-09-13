import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chat from '@material-ui/icons/Chat';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    section : {
        margin: '4em auto',
        width: '100%',
        maxWidth: '500px',
        padding: '50px',
        border: '3px solid #2196f3',
        borderRadius: '30px',
        boxSizing: 'border-box'
    },
    button : {
        background: '#2196f3',
        color: '#fff'
    },
    logoText : {
        fontSize: '32px',
        color: '#2196f3',
    },
    logo : {
        fontSize: '32px',
        color: '#2196f3'
    },
    blue : {
        color: '#2196f3'
    },
    loader : {
        textAlign: 'center'
    },
    error : {
        position: 'absolute',
        color: '#fff',
        background: 'red',
        padding: '0 5px',
        fontFamily: 'sans-serif',
        fontSize: '12px'
    }
}

class UserInputSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            loader: false,
            error: false
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.username.replace(/\s/g,'') === ''){
            this.setState({ error: true });
        } else {
            this.setState({ loader: true, error: false });
            this.props.onSubmit(this.state.username);
        }
    }

    onChange(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        if (this.state.loader) {
            return <section style={styles.section}>
                <Typography variant="title" style={styles.logoText} color="inherit">capsule-chat <Chat style={styles.logo}/></Typography>
                <div style={styles.loader}><CircularProgress style={styles.blue} /></div>
            </section>
        } else {
            return (
                <section style={styles.section}>
                    <form onSubmit={this.onSubmit.bind(this)} >
                        <Typography variant="title" style={styles.logo} color="inherit">capsule-chat <Chat style={styles.logo}/></Typography>
                        <TextField
                            id="name"
                            label="Enter the User name"
                            onChange={this.onChange.bind(this)}
                            margin="normal"
                            />
                            {this.state.error ? <div style={styles.error}>Please enter username</div> : ''}
                            <Button style={styles.button} onClick={this.onSubmit.bind(this)} variant="outlined" color="primary" >
                                Submit
                            </Button> 
                    </form>
                </section>
            )
        }
    }
}

export default UserInputSection;