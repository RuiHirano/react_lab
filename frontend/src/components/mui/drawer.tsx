import { Component, DrawerArgs } from "../../types"
import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { Drawer, Typography, TextField, ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core"
import uid from 'uid';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import * as lodash from 'lodash'
const _ = lodash

interface DrawerFieldProps {
    update: (cmp: Component) => void
    component: Component
}

export const DrawerField: React.FC<DrawerFieldProps> = (props) => {
    const { update, component } = props

    const args: DrawerArgs = component.Args.Field === "drawer" ? component.Args : new DrawerArgs()

    return (
        <div>
            <Typography>{"Drawer Field"}</Typography>
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

interface DrawerProps {
    update: (cmp: Component) => void
    component: Component
    onClick: (cmp: Component) => void
}

const RndDrawer: React.FC<DrawerProps> = (props) => {
    const { update, component, onClick } = props

    const [size, setSize] = useState(defaultDrawerSize)
    const args: DrawerArgs = component.Args.Field === "drawer" ? component.Args : new DrawerArgs()
    // const [index, setIndex] = useState<number>(0)
    //const [dolist, setDolist] = useState<Status[]>([{ Field: "drawer", Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 } }])


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
                <div style={{ height: size.height, width: size.width, backgroundColor: "peachpuff" }}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </Rnd>
    )
}

export default RndDrawer


const defaultDrawerSize = { "height": 60, "width": 200 }
