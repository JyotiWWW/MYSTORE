import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
let initialState = {
  verificationCode: '',
  password: 'test45',
  cpassword: 'test45',
}


const theme = createTheme();

function RecoverPassword() {
  const [formValue, setFormValue] = React.useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('formValue', formValue)
    const url = 'https://nameless-savannah-21991.herokuapp.com'
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data={
      verificationCode:formValue.verificationCode,
      password:formValue.password
    }
    axios({
      url: `${url}/recoverPassword`,
      method: 'POST',
      data: data,
      headers: headers
    })
      .then((res) => {
        console.log('success', res);
        if (res['data']) {
          window.location = '/login';
        }
      })
      .catch((error) => { console.log('error', error) })
  };

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
            <Typography component="h1" variant="h5">
              Recover Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                id="code"
                label="Enter code"
                name="code"
                autoComplete="code"
                autoFocus
                value={formValue.verificationCode || ''}
                onChange={(event) => setFormValue({ ...formValue, verificationCode: event.target.value })}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValue.password || ''}
                onChange={(event) => setFormValue({ ...formValue, password: event.target.value })}

              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="confirm-password"
                value={formValue.cpassword || ''}
                onChange={(event) => setFormValue({ ...formValue, cpassword: event.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default RecoverPassword