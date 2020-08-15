import { Component, ButtonArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { Button, Typography, TextField } from "@material-ui/core"
import uid from 'uid';
import * as lodash from 'lodash'
const _ = lodash

interface ButtonFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const ButtonField: React.FC<ButtonFieldProps> = (props) => {
    const { update, component } = props

    const args: ButtonArgs = component.Args.Field === "button" ? component.Args : new ButtonArgs()

    return (
        <div>
            <Typography>{"Button Field"}</Typography>
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

interface ButtonProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndButton: React.FC<ButtonProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState(defaultButtonSize)
    const args: ButtonArgs = component.Args.Field === "button" ? component.Args : new ButtonArgs()
    // const [index, setIndex] = useState<number>(0)
    console.log("rerender", component)
    //const [dolist, setDolist] = useState<Status[]>([{ Field: "button", Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 } }])
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
                const cmp = _.cloneDeep(component)
                cmp.setPosition({ x: data.x, y: data.y })
                update(cmp)
                //setIndex(index + 1)
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
                //setIndex(index + 1)
            }}
        >

            <div onClick={() => onClick(component)}>
                <Button variant={args.Variant} style={{ height: size.height, width: size.width }}>{args.Text}</Button>
            </div>
        </Rnd>
    )
}

export default RndButton

const defaultButtonSize = { "height": 60, "width": 200 }
