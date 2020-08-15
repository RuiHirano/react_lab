import React, { useState, useEffect } from "react";
import { Button, AppBarProps, Typography, AppBar, Toolbar, IconButton, Drawer, ListItem, ListItemIcon, ListItemText, List, makeStyles, Paper } from "@material-ui/core";
import { Component, ButtonArgs, AppBarArgs, TypographyArgs, TextFieldArgs, PaperArgs, DrawerArgs, App } from "../../types";
import { RndAppBar, RndButton, ButtonField, AppBarField, TypographyField, RndTypography, DrawerField, TextFieldField, PaperField, RndDrawer, RndTextField, RndPaper } from "../../components/mui";
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from "react-redux";
import { useRedux } from "../../redux/useRedux";
import { Link } from "react-router-dom";
import { ReduxState } from "../../redux/modules";
import { withRouter, match } from "react-router";
import * as H from "history";
import ParamFieldView from "./paramField";

const SCREEN_HEIGHT = window.innerHeight
const SCREEN_WIDTH = window.innerWidth
const appBarHeight = 70
const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        height: 200,
        margin: 30
    }
}));

interface RouteProps {
    history: H.History;
    location: H.Location;
    match: match<{ appId: string, pageId: string }>;
}

interface Props {
    appId: string
    pageId: string
}

const PageView: React.FC<Props> = (props) => {
    const { appId, pageId } = props
    const user = useSelector((state: ReduxState) => state.User)
    const page = user.Apps[appId].Pages[pageId]
    const components: Component[] = Object.values(page.Components)
    //const [page, setPage] = useState<number>(0)


    const [screenSize, setScreenSize] = useState({ "width": window.innerWidth, "height": window.innerHeight / 2 * 1080 / 1920 })
    const [doIndex, setDoIndex] = useState<number>(-1)
    const [dolist, setDolist] = useState<Component[]>([])
    //const [components, setComponents] = useState<Component[]>([])
    const [viewParamField, setViewParamField] = useState<Component | undefined>(undefined)


    //const app: App = new App()
    //const components = useSelector((state: ReduxState) => state.App.Components)
    //const { updateComponents } = useRedux()

    useEffect(() => {
        console.log("dolist2", dolist, doIndex, components)
    }, [dolist, doIndex])


    const pressComponent = (cmp: Component) => {
        console.log("press button")
        setViewParamField(cmp)
    }

    /*const addComponent = (args: ArgsType) => {
        const component: Component = new Component()
        setComponents([...components, component])
        setDoIndex(dolist.length)
        setDolist([...dolist.slice(0, doIndex + 1), component])
    }

    const addComponent2 = (cmp: Component) => {
        setComponents([...components, cmp])
        setDoIndex(dolist.length)
        setDolist([...dolist.slice(0, doIndex + 1), cmp])
    }*/

    const addComponent = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        const newCmps = [...components]
        console.log("not isExist")
        newCmps.push(cmp)
    }

    const update = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        const newCmps = [...components]
        let isExist = false
        components.forEach((precmp, index) => {
            if (precmp.ID === cmp.ID) {
                console.log("isExist")
                newCmps.splice(index, 1, cmp) // IDが等しいもののみ置換
                isExist = true
            }
        })
        if (!isExist) {
            console.log("not isExist")
            newCmps.push(cmp)
        }
        //setComponents(newCmps)
        //        updateComponents(newCmps)
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
                //setComponents(cpcmps)
                //                updateComponents(cpcmps)
            } else {
                // 該当すれば一個前のステータスに置換して戻す
                const cpcmps = [...components]
                cpcmps.splice(index, 1, lastCmp)
                console.log("置換", lastCmp, cpcmps)
                //setComponents(cpcmps)
                //                updateComponents(cpcmps)
            }
            setDoIndex(doIndex - 1)
        }
    }
    const redo = () => {
        if (doIndex !== dolist.length - 1) {
            const tgtCmp = dolist[doIndex + 1]
            const index = components.findIndex((cmp) => cmp.ID === tgtCmp.ID) // 同じIDのCmpをもつComponentsのindex
            if (index === -1) {
                //setComponents([...components, tgtCmp])
                //                updateComponents([...components, tgtCmp])
            } else {
                const cpcmps = [...components]
                cpcmps.splice(index, 1, tgtCmp)
                //setComponents(cpcmps)
                //                updateComponents(cpcmps)
            }

            setDoIndex(doIndex + 1)
        }
    }

    window.onresize = function () {
        console.log("resize")
        setScreenSize({ "width": window.innerWidth, "height": window.innerHeight / 2 * 1080 / 1920 })
    }
    const classes = useStyles();

    return (
        <div style={{ display: "flex", padding: 100, flexGrow: 1, marginLeft: drawerWidth, marginTop: appBarHeight }}>
            <div >
                <Typography>{`${page.Num + 1}ページ目`}</Typography>
                <Typography>{`Size: width: ${screenSize.width / 2}, height: ${screenSize.width / 2 * 1080 / 1920}`}</Typography>
                <Typography>{`既定: width: 1920, height: 1080`}</Typography>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new ButtonArgs()); update(cmp) }}>Button</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new AppBarArgs()); update(cmp) }}>AppBar</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new TypographyArgs()); update(cmp) }}>Typography</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new TextFieldArgs()); update(cmp) }}>TextField</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new DrawerArgs()); update(cmp) }}>Drawer</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new PaperArgs()); update(cmp) }}>Paper</Button>
                <div style={{ height: screenSize.width / 2 * 1080 / 1920, width: screenSize.width / 2, borderWidth: 2, borderColor: "black", borderStyle: "solid", }}>
                    {components.map((cmp: Component) => {
                        if (cmp.Args.Field === "button") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndButton onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndButton onClick={pressComponent} update={update} component={cmp} />
                            return <RndButton onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Args.Field === "appbar") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Args.Field === "typography") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndTypography onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Args.Field === "drawer") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndDrawer onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Args.Field === "textfield") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndTextField onClick={pressComponent} update={update} component={cmp} />
                        } else if (cmp.Args.Field === "paper") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={update} component={cmp} />
                            return <RndPaper onClick={pressComponent} update={update} component={cmp} />
                        } else {
                            return <div />
                        }
                    })}

                </div>
                <Button variant={"contained"} onClick={() => undo()}>戻る</Button>
                <Button variant={"contained"} onClick={() => redo()}>進む</Button>
                <Link to={`/monitor/${appId}`}>モニターで確認する</Link>
            </div >
            {viewParamField ?
                <ParamFieldView close={() => { setViewParamField(undefined) }} component={viewParamField} update={update} /> : <div />}
        </div>
    );
};


export default PageView;