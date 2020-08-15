import { Component, PaperArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { Paper, Typography, TextField, Button } from "@material-ui/core"
import uid from 'uid';
import RndButton from "./button";
import * as lodash from 'lodash'
const _ = lodash

interface PaperFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const PaperField: React.FC<PaperFieldProps> = (props) => {
    const { update, component } = props

    const args: PaperArgs = component.Args.Field === "paper" ? component.Args : new PaperArgs()

    return (
        <div>
            <Typography>{"Paper Field"}</Typography>
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

interface PaperProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndPaper: React.FC<PaperProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState(defaultPaperSize)
    const args: PaperArgs = component.Args.Field === "paper" ? component.Args : new PaperArgs()

    const [disableDragging, setDisableDragging] = useState(true)
    // const [index, setIndex] = useState<number>(0)
    //const [dolist, setDolist] = useState<Status[]>([{ Field: "paper", Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 } }])
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
                setDisableDragging(true)
                console.log(data)
                const cmp = _.cloneDeep(component)
                cmp.setPosition({ x: data.x, y: data.y })
                update(cmp)
            }}
            disableDragging={disableDragging}
            onMouseDown={() => {
                setDisableDragging(false)
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
                <Paper style={{ height: size.height, width: size.width }}>
                    <RndButton update={update} component={new Component()} onClick={onClick} />
                </Paper>
            </div>
        </Rnd>
    )
}

export default RndPaper


const defaultPaperSize = { "height": 300, "width": 200 }
