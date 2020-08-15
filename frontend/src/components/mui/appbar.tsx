import { Component, AppBarArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { AppBar, Toolbar, IconButton, Typography, TextField, Grid, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import uid from 'uid';
import * as lodash from 'lodash'
const _ = lodash

interface AppBarFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const AppBarField: React.FC<AppBarFieldProps> = (props) => {
    const { update, component } = props


    const args: AppBarArgs = component.Args.Field === "appbar" ? component.Args : new AppBarArgs()
    return (
        <div>
            <Typography>{"AppBar Field"}</Typography>
            <Typography>{`ID: ${component.ID}`}</Typography>
            <Typography>{`Size: width: ${component.Size.width}, height: ${component.Size.height}`}</Typography>
            <Typography>{`Position: x: ${component.Position.x}, y: ${component.Position.y}`}</Typography>
            <TextField variant={"outlined"} defaultValue={args.Title}
                onChange={(e) => {
                    console.log(e.target.value)
                    const cpargs = _.cloneDeep(args)
                    const cmp = _.cloneDeep(component)
                    cpargs.setTitle(e.target.value)
                    cmp.setArgs(args)
                    update(cmp)
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

    const [size, setSize] = useState(defaultAppBarSize)

    const args: AppBarArgs = component.Args.Field === "appbar" ? component.Args : new AppBarArgs()
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
            resizeHandleComponent={{ bottomRight: <Button /> }}
            onDragStop={(e, data) => {
                console.log(data)
                //const nextStatus = { ...component, Field: "button", Position: { x: data.x, y: data.y } }

                const cmp = _.cloneDeep(component)
                cmp.setPosition({ x: data.x, y: data.y })
                update(cmp)
                //setIndex(index + 1)
            }}
            onResize={(e, dir, refToElement, delta, position) => {
                console.log("delta", delta)
                setSize({ width: component.Size.width + delta.width, height: component.Size.height + delta.height })
            }}
            onResizeStop={(e, dir, refToElement, delta, position) => {
                const tgtStatus = component
                const cmp = _.cloneDeep(component)
                cmp.setPosition({ "x": position.x, "y": position.y })
                cmp.setSize({ "width": tgtStatus.Size.width + delta.width, "height": tgtStatus.Size.height + delta.height })
                update(cmp)
            }}
        >
            <div onClick={() => onClick(component)}>
                <AppBar style={{ height: size.height, width: size.width }}>
                    <Toolbar >
                        <IconButton style={{ height: 20, width: 20 }} edge="start" color="inherit" aria-label="menu">
                            <MenuIcon style={{ height: 20, width: 20 }} />
                        </IconButton>
                        <Typography variant="h6" style={{ height: 20, width: 20 }}>
                            {args.Title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </Rnd>
    )
}

export default RndAppBar




const defaultAppBarSize = { "height": 60, "width": 300 }