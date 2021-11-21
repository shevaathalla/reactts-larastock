import { usePage } from "@inertiajs/inertia-react";
import { Alert, Snackbar } from "@mui/material";
import { createTheme, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

const FlashMessage = () => {
    const { flash }: any = usePage().props;
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        if (flash.success || flash.error != null) {
            setShowMessage(true);
        }
    }, [flash]);

    const handleClose = (reason: any) => {
        if (reason === "clickaway") return;
        setShowMessage(false);
    };
    return (
        <>
            {(flash.error || (flash.success && open)) && (
                <Snackbar
                    open={showMessage}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{ marginTop: "50px", marginRight: "50px" }}
                >
                    <Alert
                        severity={flash.success ? "success" : "error"}
                        variant="filled"
                        onClose={handleClose}
                    >
                        {flash.success ? flash.success : flash.error}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default FlashMessage;
