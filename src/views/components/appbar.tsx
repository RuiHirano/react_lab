import { Component, AppBarArgs, defaultAppBarArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { AppBar, Toolbar, IconButton, Typography, TextField } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

interface AppBarFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const AppBarField: React.FC<AppBarFieldProps> = (props) => {
    const { update, component } = props


    const args: AppBarArgs = component.Args.Field === "appbar" ? component.Args : defaultAppBarArgs()
    return (
        <div>
            <Typography>{"AppBar Field"}</Typography>
            <Typography>{`ID: ${component.ID}`}</Typography>
            <Typography>{`Size: width: ${component.Size.width}, height: ${component.Size.height}`}</Typography>
            <Typography>{`Position: x: ${component.Position.x}, y: ${component.Position.y}`}</Typography>
            <TextField variant={"outlined"} defaultValue={args.Title}
                onChange={(e) => {
                    console.log(e.target.value)
                    update({ ...component, Args: { ...args, Title: e.target.value } })
                }}
            />


        </div>
    )
}


interface AppBarProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndAppBar: React.FC<AppBarProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState({ width: 500, height: 60 })

    const args: AppBarArgs = component.Args.Field === "appbar" ? component.Args : defaultAppBarArgs()
    return (
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: component.Size.width,
                height: component.Size.height
            }}
            position={{ x: component.Position.x, y: component.Position.y }}
            size={{ width: component.Size.width, height: component.Size.height }}
            bounds={"parent"}
            onDragStop={(e, data) => {
                console.log(data)
                //const nextStatus = { ...component, Field: "button", Position: { x: data.x, y: data.y } }
                update({ ...component, Position: { x: data.x, y: data.y } })
                //setIndex(index + 1)
            }}
            onResize={(e, dir, refToElement, delta, position) => {
                setSize({ width: component.Size.width + delta.width, height: component.Size.height + delta.height })
            }}
            onResizeStop={(e, dir, refToElement, delta, position) => {
                const tgtStatus = component
                //const nextStatus: Component = { Field: "button", Position: { "x": position.x, "y": position.y }, Size: { "width": tgtStatus.Size.width + delta.width, "height": tgtStatus.Size.height + delta.height } }
                update({ ...component, Position: { "x": position.x, "y": position.y }, Size: { "width": tgtStatus.Size.width + delta.width, "height": tgtStatus.Size.height + delta.height } })
                //setIndex(index + 1)
            }}
        >
            <div onClick={() => onClick(component)}>
                <AppBar style={{ height: size.height, width: size.width }}>
                    <Toolbar >
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6">
                            {args.Title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </Rnd>
    )
}

export default RndAppBar