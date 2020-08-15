import React, { useState, useEffect } from "react";
import { Button, AppBarProps, Typography, AppBar, Toolbar, IconButton, Drawer, ListItem, ListItemIcon, ListItemText, List, makeStyles, Paper } from "@material-ui/core";
import { Component, ButtonArgs, AppBarArgs, TypographyArgs, TextFieldArgs, PaperArgs, DrawerArgs, App } from "../../types";
import { RndAppBar, RndButton, ButtonField, AppBarField, TypographyField, RndTypography, DrawerField, TextFieldField, PaperField, RndDrawer, RndTextField, RndPaper } from "../../components/mui";

interface ParamFieldViewProps {
    close: () => void
    component: Component
    update: (cmp: Component) => void
}

const ParamFieldView: React.FC<ParamFieldViewProps> = (props) => {
    const { close, component, update } = props
    console.log(component)
    const field = () => {
        if (component.Args.Field === "appbar") {
            return (
                <div >
                    <AppBarField component={component} update={update} />
                </div>
            )
        } else if (component.Args.Field === "button") {
            return (
                <div >
                    <ButtonField component={component} update={update} />
                </div>
            )
        } else if (component.Args.Field === "typography") {
            return (
                <div >
                    <TypographyField component={component} update={update} />
                </div>
            )
        } else if (component.Args.Field === "drawer") {
            return (
                <div >
                    <DrawerField component={component} update={update} />
                </div>
            )
        } else if (component.Args.Field === "textfield") {
            return (
                <div >
                    <TextFieldField component={component} update={update} />
                </div>
            )
        } else if (component.Args.Field === "paper") {
            return (
                <div >
                    <PaperField component={component} update={update} />
                </div>
            )
        } else {
            return (
                <div />
            )
        }
    }
    return (
        <div >
            <Button onClick={() => close()}>閉じる</Button>
            {field()}
        </div>
    )
}

export default ParamFieldView;