import { InertiaLink } from "@inertiajs/inertia-react";
import {
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import route from "ziggy-js";
import Layout from "../../Components/Layout";
import { getNumberFormatIDR } from "../../Helpers/formatNumber";
import { Product } from "../../Model/Product";

const ShowProductPage = ({ product }: { product: Product }) => {
    const theme = createTheme({
        spacing: 4,
    });

    return (
        <Layout title={"Product Details"}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    component={InertiaLink}
                    href={route("product.index")}
                >
                    List
                </Link>
                <Typography color="text.primary">Details</Typography>
            </Breadcrumbs>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Product Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            Product Name
                        </Grid>
                        <Grid item xs={10}>
                            : {product.name}
                        </Grid>
                        <Grid item xs={2}>
                            Product Stock
                        </Grid>
                        <Grid item xs={10}>
                            : {product.stock}
                        </Grid>
                        <Grid item xs={2}>
                            Product Price
                        </Grid>
                        <Grid item xs={10}>
                            : {getNumberFormatIDR(product.price)}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        component={InertiaLink}
                        variant="contained"
                        color="primary"
                        href={route("product.edit", { product: product })}
                        sx={{ mr: "5px" }}
                    >
                        Edit Product
                    </Button>
                </CardActions>
            </Card>
        </Layout>
    );
};

export default ShowProductPage;
