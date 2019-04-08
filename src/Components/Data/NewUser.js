import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './styles.css';
import { Add_User } from '../Firebase/firestore'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function NewUser(props) {
  const { classes } = props;
  let state = {
    name: '',
    age: '',
    state: '',
    city: '',
    e_mail: '',
    disabled: true
  }
  function handleNameChange(e){
    state.name = e.target.value;
  };
  function handleCityChange(e){
    state.city = e.target.value;
  }
  function handleStateChange(e){
    state.state = e.target.value;
  }
  function handleAgeChange(e){
    state.age = e.target.value;
  }
  function handleEmailChange(e){
    state.e_mail = e.target.value;
    state.disabled = false
    
  }
  function sendData(){
    if(state.disabled === true) {
      alert('Sorry. You must complete the form');
    }
    else{
      Add_User(state.name, state.age, state.e_mail, state.city, state.state);
      document.getElementById('name').value = '';
      document.getElementById('city').value = '';
      document.getElementById('state').value = '';
      document.getElementById('age').value = '';
      document.getElementById('e_mail').value = '';
      state = {
        name: '',
        age: '',
        state: '',
        city: '',
        e_mail: '',
        disabled: true,
      }
    }
  };
  return (
    <div className='new_user'>
      <div className='ul_new_user'>
        <ul>
          <TextField
            required
            id="name"
            label="Name"
            className={classes.input}
            margin="normal"
            onChange={handleNameChange}
          />
        </ul>
        <ul>
          <TextField
            id="city"
            label="City"
            className={classes.input}
            margin="normal"
            onChange={handleCityChange}
          />
        </ul>
        <ul>
          <TextField
            id="state"
            label="State"
            className={classes.input}
            margin="normal"
            onChange={handleStateChange}
          />
        </ul>
        <ul>
          <TextField
            id="age"
            label="Age"
            className={classes.input}
            margin="normal"
            onChange={handleAgeChange}
          />
        </ul>
        <ul>
          <TextField
            required
            id="e_mail"
            label="E-mail"
            className={classes.input}
            margin="normal"
            onChange={handleEmailChange}
          />
        </ul>
        <ul> 
          <Button variant="contained" id='button' color="primary" className={classes.button} onClick={sendData}>
            Add new user
          </Button>
        </ul>
      </div>
    </div>
  );
}

NewUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewUser);