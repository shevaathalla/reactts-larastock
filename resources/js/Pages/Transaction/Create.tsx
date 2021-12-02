import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import {
    Breadcrumbs,
    Button,
    Card,
    CardActions,
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
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import route from "ziggy-js";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Layout from "../../Components/Layout";
import { TransactionCreate, TransactionDetails } from "../../Model/Transaction";
import { Product } from "../../Model/Product";
import { getNumberFormatIDR } from "../../Helpers/formatNumber";
const CreateTransactionPage = ({ products }: { products: Array<Product> }) => {
    const { data, setData, errors, post } = useForm<TransactionCreate>({
        customer_name: "",
        transaction_details: [],
        total_price: 0,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submited");
        post(route("transaction.store"));
    };

    const handleSelect = (event: any) => {
        setProduct(event.target.value);
    };

    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState<Product>(products[0]);
    const [addProductStatus, setAddProductStatus] = useState(false);
    const [deleteProductStatus, setDeleteProductStatus] = useState(false);
    const [transactionDetail, setTransactionDetail] =
        useState<TransactionDetails>({
            product,
            id: 0,
            price: 0,
            quantity: 0,
        });

    useEffect(() => {
        if (addProductStatus) {
            setData("transaction_details", [
                ...data.transaction_details,
                transactionDetail,
            ]);
            setAddProductStatus(false);
        }

        if (deleteProductStatus) {
            setData("transaction_details", data.transaction_details);
            setDeleteProductStatus(false);
        }
    }, [transactionDetail, data.transaction_details, data.total_price]);

    useEffect(() => {
        setData("total_price", countTheTotal());
    }, [data.transaction_details, data.total_price]);

    const addProduct = () => {
        let price = product.price * quantity;
        let inc = transactionDetail.id + 1;
        setAddProductStatus(true);
        setTransactionDetail({
            ...transactionDetail,
            id: inc,
            quantity: quantity,
            product: product,
            price: price,
        });
        setData("total_price", countTheTotal());
    };

    const handleDeleteProduct = (row: TransactionDetails) => {
        if (confirm("are you sure?")) {
            setDeleteProductStatus(true);
            data.transaction_details = _.reject(
                data.transaction_details,
                (el) => el.id == row.id
            );
            setData("total_price", countTheTotal());
        }
    };

    const countTheTotal = () => {
        let total = data.transaction_details
            .map((item) => item.price)
            .reduce((prev, curr) => prev + curr, 0);
        return total;
    };

    return (
        <Layout title={"Transaction Create"}>
            <form noValidate onSubmit={handleSubmit}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        component={InertiaLink}
                        href={route("transaction.index")}
                    >
                        List
                    </Link>
                    <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Create Transaction Page
                        </Typography>
                        <Divider />
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <TextField
                                    {...(errors.customer_name
                                        ? { error: true }
                                        : {})}
                                    value={data.customer_name}
                                    sx={{ marginTop: "25px" }}
                                    fullWidth
                                    label="Customer Name"
                                    id="customer_name"
                                    helperText={errors.customer_name}
                                    onChange={(e) => {
                                        setData(
                                            "customer_name",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container mt={2} spacing={2}>
                            <Grid item xs={5}>
                                <FormControl fullWidth
                                    {...(errors.transaction_details
                                        ? { error: true }
                                        : {})}
                                >
                                    <InputLabel id="product">
                                        Product
                                    </InputLabel>
                                    <Select
                                        labelId="product"
                                        id="product"
                                        label="Product"
                                        value={product}
                                        onChange={handleSelect}
                                    >
                                        {products.map((row) => (
                                            // @ts-ignore
                                            <MenuItem value={row} key={row.id}>
                                                {row.name} (Stock {row.stock}){" "}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>
                                        {errors.transaction_details}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(Number(e.target.value));
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="large"
                                    sx={{ marginTop: 1 }}
                                    onClick={addProduct}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Details</Typography>
                        <Divider sx={{ marginBottom: 3 }} />
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "600" }}>
                                    Customer Name
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                : {data.customer_name}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "600" }}>
                                    Product List
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TableContainer component={Paper}>
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        size="small"
                                        aria-label="a dense table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Product Name
                                                </TableCell>
                                                <TableCell>
                                                    Product Price
                                                </TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>
                                                    Total Price
                                                </TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.transaction_details.map(
                                                (row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{
                                                            "&:last-child td, &:last-child th":
                                                                { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell>
                                                            {row.product.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {getNumberFormatIDR(
                                                                row.product
                                                                    .price
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.quantity}
                                                        </TableCell>
                                                        <TableCell>
                                                            {getNumberFormatIDR(
                                                                row.price
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                color="error"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    handleDeleteProduct(
                                                                        row
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Grid container mt={2}>
                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "600" }}>
                                    Total Biaya
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                : {getNumberFormatIDR(countTheTotal())}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Confirm your Transaction
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Layout>
    );
};

export default CreateTransactionPage;
