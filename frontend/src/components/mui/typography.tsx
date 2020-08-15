import { Component, TypographyArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { Typography, Toolbar, IconButton, TextField } from "@material-ui/core"
import uid from 'uid';
import * as lodash from 'lodash'
const _ = lodash

interface TypographyFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const TypographyField: React.FC<TypographyFieldProps> = (props) => {
    const { update, component } = props


    const args: TypographyArgs = component.Args.Field === "typography" ? component.Args : new TypographyArgs()
    return (
        <div>
            <Typography>{"Typography Field"}</Typography>
            <Typography>{`ID: ${component.ID}`}</Typography>
            <Typography>{`Size: width: ${component.Size.width}, height: ${component.Size.height}`}</Typography>
            <Typography>{`Position: x: ${component.Position.x}, y: ${component.Position.y}`}</Typography>
            <TextField variant={"outlined"} defaultValue={args.Text}
                onChange={(e) => {
                    console.log(e.target.value)
                    const cpargs = _.cloneDeep(args)
                    const cmp = _.cloneDeep(component)
                    cpargs.setText(e.target.value)
                    cmp.setArgs(args)
                    update(cmp)
                }}
            />


        </div>
    )
}


interface TypographyProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndTypography: React.FC<TypographyProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState(defaultTypographySize)

    const args: TypographyArgs = component.Args.Field === "typography" ? component.Args : new TypographyArgs()
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
                const cmp = _.cloneDeep(component)
                cmp.setPosition({ x: data.x, y: data.y })
                update(cmp)
            }}
            onResize={(e, dir, refToElement, delta, position) => {
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
                <Typography style={{ height: size.height, width: size.width }}>
                    {args.Text}
                </Typography>
            </div>
        </Rnd>
    )
}

export default RndTypography

const defaultTypographySize = { "height": 60, "width": 200 }