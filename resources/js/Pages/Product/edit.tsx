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
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Product from "../../Model/Product";

const editProductPage = ({ product }: { product: Product }) => {
    const theme = createTheme();

    const { data, setData, errors, put } = useForm({
        product_name: product.name,
        product_stock: product.stock,
        product_price: product.price,
    });

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
                    <Link
                        underline="hover"
                        color="inherit"
                        component={InertiaLink}
                        href={route("product.show", { product: product })}
                    >
                        Details
                    </Link>
                    <Typography color="text.primary">Edit</Typography>
                </Breadcrumbs>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Edit Product Page
                        </Typography>
                        <Divider />
                        <Grid container spacing={2}>
                            <Grid item xs={12} mb={2}>
                                <TextField
                                    sx={{ marginTop: "25px" }}
                                    value={data.product_name}
                                    fullWidth
                                    label="Product Name"
                                    id="product_name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={data.product_stock}
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
                                <FormControl fullWidth variant="standard">
                                    <InputLabel htmlFor="product_price">
                                        Product Price
                                    </InputLabel>
                                    <Input
                                        value={data.product_price}
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
                            <Grid
                                item
                                xs={12}
                                justifyContent="flex-start"
                                mt={3}
                            >
                                <Button variant="contained" color="success">
                                    Update Product
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default editProductPage;
