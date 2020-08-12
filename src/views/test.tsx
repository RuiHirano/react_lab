import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Typography, Button, AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Rnd } from 'react-rnd'
import uid from 'uid';


interface Status {
    Field: string
    Position: { "x": number, "y": number }
    Size: { "width": number, "height": number }
}

interface Component {
    ID: string
    Field: string
    Position: { "x": number, "y": number }
    Size: { "width": number, "height": number }
}

interface AppBarProps {
    update: (cmp: Component) => void
    component: Component
}

const RndAppBar: React.FC<AppBarProps> = (props) => {
    const { update, component } = props

    const [size, setSize] = useState({ width: 500, height: 60 })
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
            <AppBar style={{ height: size.height, width: size.width }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" style={{ backgroundColor: "green" }}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" style={{ backgroundColor: "red" }}>
                        News
                </Typography>
                </Toolbar>
            </AppBar>
        </Rnd>
    )
}

interface ButtonProps {
    update: (cmp: Component) => void
    component: Component
}

const RndButton: React.FC<ButtonProps> = (props) => {
    const { update, component } = props

    const [size, setSize] = useState({ width: 500, height: 60 })
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
            <Button variant={"contained"} style={{ height: size.height, width: size.width }}>{"test"}</Button>
        </Rnd>
    )
}

const Test: React.FC = () => {
    //const [size, setSize] = useState({ width: 500, height: 60 })
    const [doIndex, setDoIndex] = useState<number>(-1)
    const [dolist, setDolist] = useState<Component[]>([])
    const [components, setComponents] = useState<Component[]>([])

    useEffect(() => {
        console.log("dolist2", dolist, doIndex, components)
    }, [dolist, doIndex])

    const setButton = () => {
        const component = { ID: uid(), Field: "button", Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 } }
        setComponents([...components, component])
        setDoIndex(dolist.length)
        setDolist([...dolist.slice(0, doIndex + 1), component])
    }
    const setAppBar = () => {
        const component = { ID: uid(), Field: "appbar", Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 } }
        setComponents([...components, component])
        setDoIndex(dolist.length)
        setDolist([...dolist.slice(0, doIndex + 1), component])
    }

    const update = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        const newCmps = [...components]
        components.forEach((precmp, index) => {
            if (precmp.ID === cmp.ID) {
                newCmps.splice(index, 1, cmp) // IDが等しいもののみ置換
            }
        })
        setComponents(newCmps)
    }

    const undo = () => {
        if (doIndex !== -1) {
            const tgtCmp = dolist[doIndex]
            const lastCmp = dolist.slice(0, doIndex).reverse().find((cmp) => cmp.ID === tgtCmp.ID) // 一つ前の同じIDのCmpをもつDolistのindex
            const index = components.findIndex((cmp) => cmp.ID === tgtCmp.ID) // 同じIDのCmpをもつComponentsのindex
            if (lastCmp === undefined) {
                // 該当しなかったら削除
                const cpcmps = [...components]
                cpcmps.splice(index, 1)
                setComponents(cpcmps)
            } else {
                // 該当すれば一個前のステータスに置換して戻す
                const cpcmps = [...components]
                cpcmps.splice(index, 1, lastCmp)
                setComponents(cpcmps)
            }
            setDoIndex(doIndex - 1)
        }
    }
    const redo = () => {
        if (doIndex !== dolist.length - 1) {
            const tgtCmp = dolist[doIndex + 1]
            const index = components.findIndex((cmp) => cmp.ID === tgtCmp.ID) // 同じIDのCmpをもつComponentsのindex
            if (index === -1) {
                setComponents([...components, tgtCmp])
            } else {
                const cpcmps = [...components]
                cpcmps.splice(index, 1, tgtCmp)
                setComponents(cpcmps)
            }

            setDoIndex(doIndex + 1)
        }
    }
    return (
        <div>
            <Button variant={"contained"} onClick={() => setButton()}>Button</Button>
            <Button variant={"contained"} onClick={() => setAppBar()}>AppBar</Button>
            <div style={{ height: 500, width: 800, backgroundColor: "blue", borderWidth: 1, borderColor: "black", borderStyle: "solid" }}>
                {components.map((cmp: Component) => {
                    if (cmp.Field === "button") {
                        return <RndButton update={update} component={cmp} />
                    } else if (cmp.Field === "appbar") {
                        return <RndAppBar update={update} component={cmp} />
                    } else {
                        return <div />
                    }
                })}

            </div>
            <Button variant={"contained"} onClick={() => undo()}>戻る</Button>
            <Button variant={"contained"} onClick={() => redo()}>進む</Button>
        </div >
    );
};

export default Test;