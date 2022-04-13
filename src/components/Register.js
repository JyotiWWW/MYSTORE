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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

const theme = createTheme();
let initialState ={
  firstName:'',
  secondName:'',
  profile:'',
  contactNo:'',
  email:'',
  password:'',
  confirmPassword:'',
  gender:'female'
}
function Register() {
  const [formValue, setFormValue] = React.useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('event.currentTarget', formValue)
    const url = 'https://nameless-savannah-21991.herokuapp.com'
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

   

    const formData = new FormData();
    formData.append('firstName',formValue.firstName );
    formData.append('secondName',formValue.firstName );
    // formData.append('profile-pic', new Blob(['test payload']), { type: 'image/*' });
    formData.append('profile-pic', new Blob());
    formData.append('contactNo',formValue.contactNo);
    formData.append('email',formValue.email);
    formData.append('password',formValue.password);
    formData.append('gender',formValue.gender);

    axios({
      url: `${url}/register`,
      method: 'POST',
      data: formData,
      headers: headers
    })
      .then((res) => { console.log('success', res) })
      .catch((error) => { console.log('error', error) })

  };

  const handleChange = (event) => {
    setFormValue({...formValue, gender:event.target.value});
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={formValue.firstName || ''}
                    onChange={(event)=>setFormValue({...formValue, firstName:event.target.value})}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formValue.secondName ||''}
                    onChange={(event)=>setFormValue({...formValue, secondName:event.target.value})}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formValue.email ||''}
                    onChange={(event)=>setFormValue({...formValue, email:event.target.value})}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formValue.password ||''}
                    onChange={(event)=>setFormValue({...formValue, password:event.target.value})}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm password"
                    label="Confirm Password"
                    type="password"
                    id="confirm password"
                    value={formValue.confirmPassword ||''}
                    onChange={(event)=>setFormValue({...formValue, confirmPassword:event.target.value})}
                    autoComplete="confirm-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="mobilenumber"
                    label="Enter mobile number"
                    name="mobilenumber"
                    value={formValue.contactNo ||''}
                    onChange={(event)=>setFormValue({...formValue, contactNo:event.target.value})}
                    autoComplete="mobilenumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>

                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={formValue.gender ||'female'}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    component="p"
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
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

export default Register