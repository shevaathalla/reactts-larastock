import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import DataTable, { Alignment, TableColumn } from "react-data-table-component";
import route from "ziggy-js";
import Layout from "../../Components/Layout";
import { getNumberFormatIDR } from "../../Helpers/formatNumber";
import { Transaction } from "../../Model/Transaction";

const IndexTransactionPage = ({
    transactions,
}: {
    transactions: Array<Transaction>;
}) => {
    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);

    const handleChange = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            let ids = selectedRows.map((row) => row.id);
            if (
                window.confirm(
                    `Are you sure you want to delete:\r ${selectedRows.map(
                        (r) => r.transaction_code
                    )}?`
                )
            ) {
                Inertia.delete(route('transaction.destroy', {transactions: ids.toString()}));
                setToggleCleared(!toggleCleared);
            }
        };

        return (
            <Button onClick={handleDelete} variant="contained" color="error">
                Delete
            </Button>
        );
    }, [selectedRows, toggleCleared]);

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

    const columns: TableColumn<Transaction>[] = useMemo(
        () => [
            {
                name: "#",
                cell: (row, index) => index + 1,
                maxWidth: "100",
            },
            {
                name: "Transaction Code",
                selector: (row) => row.transaction_code,
            },
            {
                name: "Customer Name",
                selector: (row) => row.customer_name,
                sortable: true,
            },
            {
                name: "Total Price",
                selector: (row) => getNumberFormatIDR(row.total_price),
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
                                href={route("transaction.show", {
                                    transaction: row,
                                })}
                                color="primary"
                                variant="contained"
                            >
                                Details
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
        <Layout title="Transaction Index">
            <Card variant="outlined">
                <DataTable
                    title="Transaction List"
                    theme="default"
                    columns={columns}
                    data={transactions}
                    selectableRows
                    subHeaderAlign={Alignment.LEFT}
                    subHeader
                    subHeaderComponent={
                        <Button
                            component={InertiaLink}
                            href={route("transaction.create")}
                            variant="contained"
                            color="success"
                        >
                            Add New Transaction
                        </Button>
                    }
                    customStyles={dataTableTheme}
                    contextActions={contextActions}
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggleCleared}
                    pagination
                    responsive
                ></DataTable>
            </Card>
        </Layout>
    );
};

export default IndexTransactionPage;
