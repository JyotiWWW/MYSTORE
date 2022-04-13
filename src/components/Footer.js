import React from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Copyright(props) {
  return (
    <Typography variant="body2"  align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <div>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Copyright sx={{ mt: 1, mb: 1 }} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Footer