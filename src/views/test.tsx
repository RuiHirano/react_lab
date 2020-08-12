import React, { useState, useEffect } from "react";
import { Button, AppBarProps } from "@material-ui/core";
import uid from 'uid';
import { Component, ButtonArgs, AppBarArgs, defaultButtonArgs, defaultAppBarArgs } from "../types";
import { RndAppBar, RndButton, ButtonField, AppBarField } from "./components";

interface ParameterFieldProps {
    close: () => void
    component: Component
    update: (cmp: Component) => void
}

const ParameterField: React.FC<ParameterFieldProps> = (props) => {
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


const Test: React.FC = () => {
    const [doIndex, setDoIndex] = useState<number>(-1)
    const [dolist, setDolist] = useState<Component[]>([])
    const [components, setComponents] = useState<Component[]>([])
    const [viewParamField, setViewParamField] = useState<Component | undefined>(undefined)

    useEffect(() => {
        console.log("dolist2", dolist, doIndex, components)
    }, [dolist, doIndex])


    const pressComponent = (cmp: Component) => {
        console.log("press button")
        setViewParamField(cmp)
    }

    const addComponent = (args: AppBarArgs | ButtonArgs) => {
        const component: Component = { ID: uid(), Field: args.Field, Position: { "x": 0, "y": 0 }, Size: { "height": 60, "width": 500 }, Args: args }
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
        <div style={{ display: "flex" }}>
            <div>
                <Button variant={"contained"} onClick={() => addComponent(defaultButtonArgs())}>Button</Button>
                <Button variant={"contained"} onClick={() => addComponent(defaultAppBarArgs())}>AppBar</Button>
                <div style={{ height: 500, width: 800, backgroundColor: "blue", borderWidth: 1, borderColor: "black", borderStyle: "solid" }}>
                    {components.map((cmp: Component) => {
                        if (cmp.Field === "button") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndButton onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndButton onClick={pressComponent} update={update} component={cmp} />
                            return <RndButton onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Field === "appbar") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                        } else {
                            return <div />
                        }
                    })}

                </div>
                <Button variant={"contained"} onClick={() => undo()}>戻る</Button>
                <Button variant={"contained"} onClick={() => redo()}>進む</Button>
            </div >
            {viewParamField ?
                <ParameterField close={() => { setViewParamField(undefined) }} component={viewParamField} update={update} /> : <div />}
        </div>
    );
};


export default Test;