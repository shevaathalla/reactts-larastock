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
    FormHelperText,
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
import { ProductCreate } from "../../Model/Product";
const createProductPage = () => {
    const theme = createTheme();

    const { data, setData, errors, post } = useForm<ProductCreate>({
        product_name: "",
        product_stock: 0,
        product_price: 0,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route("product.store"));
    };
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
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} mb={2}>                                    
                                    <TextField
                                        {...(errors.product_name
                                            ? { error: true }
                                            : {})}
                                        value={data.product_name}
                                        sx={{ marginTop: "25px" }}
                                        fullWidth
                                        label="Product Name"
                                        id="product_name"
                                        helperText={errors.product_name}
                                        onChange={(e) => {
                                            setData(
                                                "product_name",
                                                e.target.value
                                            );
                                        }}
                                    />                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...(errors.product_stock
                                            ? { error: true }
                                            : {})}
                                        value={data.product_stock}
                                        fullWidth
                                        label="Product Stock"
                                        type="number"
                                        id="product_stock"
                                        helperText={errors.product_stock}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {
                                            setData(
                                                "product_stock",
                                                Number(e.target.value)
                                            );
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl {...(errors.product_price) ? {error:true} : {} } fullWidth variant="standard">
                                        <InputLabel htmlFor="product_price">
                                            Product Price
                                        </InputLabel>
                                        <Input                                            
                                            value={data.product_price}
                                            id="product_price"
                                            type="number"
                                            onChange={(e) => {
                                                setData(
                                                    "product_price",
                                                    Number(e.target.value)
                                                );
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    Rp.
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText>{errors.product_price}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    justifyContent="flex-start"
                                    mt={3}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Create New Product
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default createProductPage;
