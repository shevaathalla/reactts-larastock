import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    Box,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { UserRegister } from '../../Model/User';

const registerPage = () => {
    const theme = createTheme();

    const {data, setData, errors, post} = useForm<UserRegister>({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        password_confirmation:""

    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(route('register'));
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                {...(errors.firstname) ? {error:true}: {}}
                  autoComplete="given-name"
                  name="firstname"
                  value={data.firstname}
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  helperText={errors.firstname}
                  onChange = {(e)=>setData('firstname',e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                {...(errors.lastname) ? {error:true}: {}}
                  required
                  fullWidth
                  id="lastname"
                  value={data.lastname}
                  label="Last Name"
                  name="lastname"
                  onChange = {(e)=>setData('lastname',e.target.value)}
                  helperText={errors.lastname}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...(errors.email) ? {error:true}: {}}
                  required
                  fullWidth
                  id="email"
                  value={data.email}
                  label="Email Address"
                  onChange = {(e)=>setData('email',e.target.value)}
                  helperText={errors.email}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...(errors.password) ? {error:true}: {}}
                  required
                  fullWidth
                  value={data.password}
                  name="password"
                  label="Password"
                  type="password"
                  onChange = {(e)=>setData('password',e.target.value)}
                  helperText={errors.password}
                  id="password"                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...(errors.password_confirmation) ? {error:true}: {}}
                  required
                  fullWidth
                  value={data.password_confirmation}
                  name="password_confirmation"
                  label="Type your password again"
                  type="password"
                  onChange = {(e)=>setData('password_confirmation',e.target.value)}
                  helperText={errors.password_confirmation}
                  id="password_confirmation"                  
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link component={InertiaLink} href={route('login.view')} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
        </ThemeProvider>
    )
}

export default registerPage