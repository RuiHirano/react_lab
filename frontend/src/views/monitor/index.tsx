import React, { useState, useEffect } from "react";
import { Button, AppBarProps, Typography, AppBar, Drawer, TextField, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/modules";
import { Component, Page } from "../../types";
import { withRouter, match } from "react-router";
import * as H from "history";


const buttondata = {
    "size": { "width": 200, "height": 100 },
    "position": { "x": 0, "y": 0 },
    "text": "送信",
    "disabled": false,
    "variant": "contained",
}

interface Props {
    history: H.History;
    location: H.Location;
    match: match<{ appId: string }>;
}

const Monitor: React.FC<Props> = (props) => {
    const { match } = props
    const appId = match.params.appId
    const user = useSelector((state: ReduxState) => state.User)
    const app = user.Apps[appId]
    const [pages, setPages] = useState<Page[]>(Object.values(app.Pages))
    const [page, setPage] = useState<Page>(pages[0]) // exist at least 1 page
    const components: Component[] = Object.values(page.Components)
    console.log("user ", user)

    const style = {
        button: {
            width: buttondata.size.width,
            height: buttondata.size.height,
        }
    }

    return (
        <div>
            <Typography>Monitor</Typography>
            {components.map((cmp: Component) => {
                if (cmp.Args.Field === "button") {
                    return <Button variant={cmp.Args.Variant} >{cmp.Args.Text}</Button>
                } else if (cmp.Args.Field === "appbar") {
                    return <AppBar />
                } else if (cmp.Args.Field === "typography") {
                    return <Typography />
                } else if (cmp.Args.Field === "drawer") {
                    return <Drawer />
                } else if (cmp.Args.Field === "textfield") {
                    return <TextField />
                } else if (cmp.Args.Field === "paper") {
                    return <Paper />
                } else {
                    return <div />
                }
            })}
        </div>
    );
};


export default Monitor;