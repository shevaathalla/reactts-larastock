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
import { Product } from "../../Model/Product";
import Layout from "../../Components/Layout";

const editProductPage = ({ product }: { product: Product }) => {
    const theme = createTheme();

    const { data, setData, errors, put } = useForm({
        product_name: product.name,
        product_stock: product.stock,
        product_price: product.price,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("product.update", { product: product }));
    };
    return (
        <Layout title={"Product Edit"}>
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
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} mb={2}>
                                <TextField
                                    {...(errors.product_name
                                        ? { error: true }
                                        : {})}
                                    sx={{ marginTop: "25px" }}
                                    value={data.product_name}
                                    fullWidth
                                    helperText={errors.product_name}
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                    label="Product Name"
                                    id="product_name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    {...(errors.product_stock
                                        ? { error: true }
                                        : {})}
                                    value={data.product_stock}
                                    fullWidth
                                    helperText={errors.product_stock}
                                    label="Product Stock"
                                    type="number"
                                    id="product_stock"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        setData(
                                            "product_stock",
                                            Number(e.target.value)
                                        )
                                    }
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    {...(errors.product_price
                                        ? { error: true }
                                        : {})}
                                    fullWidth
                                    variant="standard"
                                >
                                    <InputLabel htmlFor="product_price">
                                        Product Price
                                    </InputLabel>
                                    <Input
                                        value={data.product_price}
                                        id="product_price"
                                        type="number"
                                        onChange={(e) =>
                                            setData(
                                                "product_price",
                                                Number(e.target.value)
                                            )
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                Rp.
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>
                                        {errors.product_price}
                                    </FormHelperText>
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
                                    color="success"
                                    type="submit"
                                >
                                    Update Product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default editProductPage;
