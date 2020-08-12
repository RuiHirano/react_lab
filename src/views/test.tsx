import React, { useState, useEffect } from "react";
import { Typography, Button, AppBar, Toolbar } from "@material-ui/core";
import { Rnd } from 'react-rnd'

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

interface Status {
    Field: string
    Position: { "x": number, "y": number }
    Size: { "width": number, "height": number }
}

const Test: React.FC = () => {
    const [size, setSize] = useState({ width: 100, height: 100 })
    const [index, setIndex] = useState<number>(0)
    const [stlist, setStlist] = useState<Status[]>([{ Field: "header", Position: { "x": 0, "y": 0 }, Size: { "height": 100, "width": 100 } }])

    const undo = () => {
        if (index !== 0) {
            setIndex(index - 1)
            setSize({ width: stlist[index - 1].Size.width, height: stlist[index - 1].Size.height })
            //setHeight(whlist[index - 1].height);
            //setWidth(whlist[index - 1].width);
        }
    }
    const redo = () => {
        if (index !== stlist.length - 1) {
            setIndex(index + 1)
            setSize({ width: stlist[index + 1].Size.width, height: stlist[index + 1].Size.height })
            //setHeight(whlist[index + 1].height);
            //setWidth(whlist[index + 1].width);
        }
    }
    return (
        <div>
            <div style={{ height: 500, width: 800, backgroundColor: "blue", borderWidth: 1, borderColor: "black", borderStyle: "solid" }}>
                <Rnd
                    default={{
                        x: 0,
                        y: 0,
                        width: stlist[0].Size.width,
                        height: stlist[0].Size.height
                    }}
                    position={{ x: stlist[index].Position.x, y: stlist[index].Position.y }}
                    size={{ width: stlist[index].Size.width, height: stlist[index].Size.height }}
                    bounds={"parent"}
                    onDragStop={(e, data) => {
                        console.log(data)
                        const nextStatus = { ...stlist[index], Field: "header", Position: { x: data.x, y: data.y } }
                        setStlist([...stlist.splice(0, index + 1), nextStatus])
                        setIndex(index + 1)
                    }}
                    onResize={(e, dir, refToElement, delta, position) => {
                        setSize({ width: stlist[index].Size.width + delta.width, height: stlist[index].Size.height + delta.height })
                    }}
                    onResizeStop={(e, dir, refToElement, delta, position) => {
                        const tgtStatus = stlist[index]
                        const nextStatus: Status = { Field: "header", Position: { "x": position.x, "y": position.y }, Size: { "width": tgtStatus.Size.width + delta.width, "height": tgtStatus.Size.height + delta.height } }
                        setStlist([...stlist.splice(0, index + 1), nextStatus])
                        setIndex(index + 1)
                        console.log(stlist);
                    }}
                >
                    <AppBar style={{ height: size.height, width: size.width }}>
                        <Toolbar></Toolbar>
                    </AppBar>
                </Rnd>

            </div>
            <Button variant={"contained"} onClick={() => undo()}>戻る</Button>
            <Button variant={"contained"} onClick={() => redo()}>進む</Button>
        </div >
    );
};

export default Test;