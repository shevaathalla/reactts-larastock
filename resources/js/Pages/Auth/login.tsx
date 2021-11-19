import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { UserLogin } from "../../Model/User";
import route from "ziggy-js";

const loginPage = () => {
    const theme = createTheme();

    const { data, setData, errors, post } = useForm<UserLogin>({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('login'));
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary" }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            {...(errors.email ? { error: true } : {})}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={data.email}
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={errors.email}
                            autoFocus
                        />
                        <TextField
                            {...(errors.password ? { error: true } : {})}
                            margin="normal"
                            required
                            fullWidth
                            value={data.password}
                            onChange={(e) => {
                                setData("password", e.target.value);
                            }}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={errors.password}
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
                            <Grid item>
                                <Link component={InertiaLink} href={route('register.view')} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default loginPage;
