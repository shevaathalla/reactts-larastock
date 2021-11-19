import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";

export const listItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={InertiaLink} href={route('product.index')}>
            <ListItemIcon>
                <AllInboxIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
        </ListItem>
    </div>
);
