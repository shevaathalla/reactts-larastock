import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Alignment, TableColumn } from "react-data-table-component";
import { Card, Container, Stack } from "@mui/material";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import Product from "../../Model/Product";

const IndexProductPage = ({ products }: { products: Array<Product> }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        console.log("state", selectedRows);
    }, [selectedRows]);

    const handleButtonClick = () => {
        console.log("clicked");
    };

    const handleChange = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const dataTableTheme = {
        header: {
            style: {
                fontSize: "22px",
            },
        },
        head: {
            style: {
                fontSize: "18px",
            },
        },
    };

    const theme = createTheme();

    const columns: TableColumn<Product>[] = useMemo(
        () => [
            {
                name: "Product Name",
                selector: (row) => row.name,
                sortable: true,
            },
            {
                name: "Stock",
                selector: (row) => row.stock,
                sortable: true,
            },
            {
                name: "Price",
                selector: (row) => "RP. " + row.price,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button
                                component={InertiaLink}
                                size="small"
                                href={route("product.show", { product: row })}
                                color="primary"
                                variant="contained"
                            >
                                Details
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                size="small"
                            >
                                Delete
                            </Button>
                        </Stack>
                    </div>
                ),
                minWidth: "250",
                ignoreRowClick: true,
                button: true,
            },
        ],
        []
    );
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ marginTop: "50px" }}>
                <Card variant="outlined">
                    <DataTable
                        theme="default"
                        title="Products List"
                        subHeaderAlign={Alignment.LEFT}
                        subHeader subHeaderComponent={
                            <Button variant="contained" color="success">
                                Create
                            </Button>
                        }                        
                        columns={columns}
                        data={products}
                        customStyles={dataTableTheme}
                        selectableRows
                        onSelectedRowsChange={handleChange}
                        pagination
                        responsive
                    ></DataTable>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default IndexProductPage;
