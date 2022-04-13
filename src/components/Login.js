import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AuthContext} from '../context/AuthContextProvider';
import {useNavigate} from 'react-router-dom'
let initialState = {
  email: 'test45@gmail.com',
  password: 'test45',
}

const theme = createTheme();
function Login() {
  const {setAuth}  = React.useContext(AuthContext);
  const navigate  = useNavigate()
  const [formValue, setFormValue] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('event.currentTarget', formValue)
    const url = 'https://nameless-savannah-21991.herokuapp.com'
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios({
      url: `${url}/login`,
      method: 'POST',
      data: formValue,
      headers: headers
    })
      .then((res) => {
        console.log('success', res);
        if (res['data']) {
          localStorage.setItem('userData', JSON.stringify(res.data));
          setAuth({...res.data});
          navigate('/')
        }
      })
      .catch((error) => { console.log('error', error) })

  };


  const handleRecoverSubmit = (event) =>{
    event.preventDefault();
    console.log('event.email', email)
    const url = 'https://nameless-savannah-21991.herokuapp.com'
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data={
      email:email
    }
    axios({
      url: `${url}/forgotPassword`,
      method: 'POST',
      data: data,
      headers: headers
    })
      .then((res) => {
        console.log('success', res);
        if (res['data']) {
          handleClose();
          window.location = '/recoverpassword';
        }
      })
      .catch((error) => { console.log('error', error) })
  }


  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValue.email || ''}
                onChange={(event) => setFormValue({ ...formValue, email: event.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formValue.password || ''}
                onChange={(event) => setFormValue({ ...formValue, password: event.target.value })}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <div onClick={handleClickOpen} variant="body2">
                    Forgot password?
                  </div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Enter email
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email || ''}
                        onChange={(event) => setEmail(event.target.value)}        
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleRecoverSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Login