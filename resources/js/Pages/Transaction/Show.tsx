import { InertiaLink } from "@inertiajs/inertia-react";
import {
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import route from "ziggy-js";
import Layout from "../../Components/Layout";
import { getNumberFormatIDR } from "../../Helpers/formatNumber";
import { Transaction, TransactionDetails } from "../../Model/Transaction";

const ShowTransactionPage = ({ transaction }: { transaction: Transaction }) => {        

    return (
        <Layout title={"Transaction Details"}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    component={InertiaLink}
                    href={route("transaction.index")}
                >
                    List
                </Link>
                <Typography color="text.primary">Details</Typography>
            </Breadcrumbs>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Transaction Details
                    </Typography>
                    <Divider sx={{ marginBottom: 3 }} />
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={2}>
                            <Typography sx={{ fontWeight: "600" }}>
                                Transaction Code
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            : {transaction.transaction_code}
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={2}>
                            <Typography sx={{ fontWeight: "600" }}>
                                Customer Name
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            : {transaction.customer_name}
                        </Grid>
                    </Grid>                    
                    <Grid container direction="row" spacing={2}>
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
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Product Price</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Total Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transaction.transaction_details.map(
                                            (row) => (
                                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell>
                                                        {row.product.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getNumberFormatIDR(row.product.price)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.quantity}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getNumberFormatIDR(row.price)}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" mt={2} spacing={2}>
                        <Grid item xs={2}>
                            <Typography sx={{ fontWeight: "600" }}>
                                Total Transaction Price
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            : {getNumberFormatIDR(transaction.total_price)}
                        </Grid>
                    </Grid>                    
                </CardContent>
                <CardActions>
                    <Button
                        component={InertiaLink}
                        variant="contained"
                        color="primary"
                        href="#"                        
                    >
                        Edit Transaction
                    </Button>
                </CardActions>
            </Card>
        </Layout>
    );
};

export default ShowTransactionPage;
