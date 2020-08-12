import { Component, ButtonArgs, defaultButtonArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { Button, Typography, TextField } from "@material-ui/core"

interface ButtonFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const ButtonField: React.FC<ButtonFieldProps> = (props) => {
    const { update, component } = props

    const args: ButtonArgs = component.Args.Field === "button" ? component.Args : defaultButtonArgs()

    return (
        <div>
            <Typography>{"Button Field"}</Typography>
            <TextField variant={"outlined"} defaultValue={args.Text}
                onChange={(e) => {
                    console.log(e.target.value)
                    update({ ...component, Args: { ...args, Text: e.target.value } })
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

    const [size, setSize] = useState({ width: 500, height: 60 })
    const args: ButtonArgs = component.Args.Field === "button" ? component.Args : defaultButtonArgs()
    // const [index, setIndex] = useState<number>(0)
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
                <Button variant={args.Variant} style={{ height: size.height, width: size.width }}>{args.Text}</Button>
            </div>
        </Rnd>
    )
}

export default RndButton