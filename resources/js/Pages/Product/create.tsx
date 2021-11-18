import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import route from "ziggy-js";
import { InertiaLink } from "@inertiajs/inertia-react";

const createProductPage = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ marginTop: "50px" }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        component={InertiaLink}
                        href={route("product.index")}
                    >
                        List
                    </Link>
                    <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Create Product Page
                        </Typography>
                        <Divider />
                        <Grid container spacing={2}>
                            <Grid item xs={12} mb={2}>
                                <TextField
                                    sx={{ marginTop: "25px" }}
                                    fullWidth
                                    label="Product Name"
                                    id="product_name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Product Stock"
                                    type="number"
                                    id="product_stock"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                      variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth                                    
                                    variant="standard"
                                >
                                    <InputLabel htmlFor="product_price">
                                        Product Price
                                    </InputLabel>
                                    <Input
                                        id="product_price"  
                                        type="number"                                      
                                        startAdornment={
                                            <InputAdornment position="start">
                                                Rp.
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-start" mt={3}>
                                <Button variant="contained" color="primary">
                                    Create New Product
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default createProductPage;
