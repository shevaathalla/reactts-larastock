require("./bootstrap");
import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import nProgress from "nprogress";

InertiaProgress.init({
    // The color of the progress bar.
    color: "red",

    includeCSS: true,
    // Whether the NProgress spinner will be shown.
    showSpinner: true,
});


createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    },
});
