import { Component, TextFieldArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { TextField, Toolbar, IconButton, Typography } from "@material-ui/core"
import uid from 'uid';
import * as lodash from 'lodash'
const _ = lodash

interface TextFieldFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const TextFieldField: React.FC<TextFieldFieldProps> = (props) => {
    const { update, component } = props


    const args: TextFieldArgs = component.Args.Field === "textfield" ? component.Args : new TextFieldArgs()
    return (
        <div>
            <Typography>{"TextField Field"}</Typography>
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


interface TextFieldProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndTextField: React.FC<TextFieldProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState(defaultTextFieldSize)

    const args: TextFieldArgs = component.Args.Field === "textfield" ? component.Args : new TextFieldArgs()
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
                console.log(data, component)
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
                <TextField style={{ height: size.height, width: size.width }}>
                    {args.Text}
                </TextField>
            </div>
        </Rnd>
    )
}

export default RndTextField


const defaultTextFieldSize = { "height": 60, "width": 100 }