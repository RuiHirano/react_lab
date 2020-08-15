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
import * as lodash from 'lodash'
const _ = lodash

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
    const { updateApp } = useRedux()

    useEffect(() => {
        console.log("dolist2", dolist, doIndex, components)
    }, [dolist, doIndex])


    const pressComponent = (cmp: Component) => {
        console.log("press button")
        setViewParamField(cmp)
    }

    const deleteComponent = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        // reduxに保存
        const newPage = _.cloneDeep(page)
        delete newPage.Components[cmp.ID]
        const newApp = _.cloneDeep(user.Apps[appId])
        newApp.Pages[pageId] = newPage
        updateApp(newApp)
    }

    const addComponent = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        // reduxに保存
        const newPage = _.cloneDeep(page)
        newPage.Components[cmp.ID] = cmp
        const newApp = _.cloneDeep(user.Apps[appId])
        newApp.Pages[pageId] = newPage
        updateApp(newApp)
    }

    const updateComponent = (cmp: Component) => {
        setDolist([...dolist.splice(0, doIndex + 1), cmp])
        setDoIndex(doIndex + 1)
        // reduxに保存
        const newPage = _.cloneDeep(page)
        newPage.Components[cmp.ID] = cmp
        const newApp = _.cloneDeep(user.Apps[appId])
        newApp.Pages[pageId] = newPage
        updateApp(newApp)
    }

    const undo = () => {
        if (doIndex !== -1) {
            const tgtCmp = dolist[doIndex]
            const lastCmp = dolist.slice(0, doIndex).reverse().find((cmp) => cmp.ID === tgtCmp.ID) // 一つ前の同じIDのCmpをもつDolistのindex
            //const index = components.findIndex((cmp) => cmp.ID === tgtCmp.ID) // 同じIDのCmpをもつComponentsのindex
            const newPage = _.cloneDeep(page)
            if (lastCmp === undefined) {
                // 該当しなかったら削除
                delete newPage.Components[tgtCmp.ID]
            } else {
                // 該当すれば一個前のステータスに置換して戻す
                newPage.Components[lastCmp.ID] = lastCmp
            }
            setDoIndex(doIndex - 1)
            const newApp = _.cloneDeep(user.Apps[appId])
            newApp.Pages[pageId] = newPage
            updateApp(newApp)
        }
    }
    const redo = () => {
        if (doIndex !== dolist.length - 1) {
            const tgtCmp = dolist[doIndex + 1]
            //const index = components.findIndex((cmp) => cmp.ID === tgtCmp.ID) // 同じIDのCmpをもつComponentsのindex
            const newPage = _.cloneDeep(page)

            newPage.Components[tgtCmp.ID] = tgtCmp

            setDoIndex(doIndex + 1)
            const newApp = _.cloneDeep(user.Apps[appId])
            newApp.Pages[pageId] = newPage
            updateApp(newApp)
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
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new ButtonArgs()); addComponent(cmp) }}>Button</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new AppBarArgs()); addComponent(cmp) }}>AppBar</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new TypographyArgs()); addComponent(cmp) }}>Typography</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new TextFieldArgs()); addComponent(cmp) }}>TextField</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new DrawerArgs()); addComponent(cmp) }}>Drawer</Button>
                <Button variant={"contained"} onClick={() => { const cmp = new Component(); cmp.setArgs(new PaperArgs()); addComponent(cmp) }}>Paper</Button>
                <div style={{ height: screenSize.width / 2 * 1080 / 1920, width: screenSize.width / 2, borderWidth: 2, borderColor: "black", borderStyle: "solid", }}>
                    {components.map((cmp: Component) => {
                        if (cmp.Args.Field === "button") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndButton onClick={pressComponent} update={update} component={cmp} /></Focus> : <RndButton onClick={pressComponent} update={update} component={cmp} />
                            return <RndButton onClick={pressComponent} update={updateComponent} component={cmp} />
                        } else if (cmp.Args.Field === "appbar") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                            return <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                        } else if (cmp.Args.Field === "typography") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                            return <RndTypography onClick={pressComponent} update={updateComponent} component={cmp} />
                        } else if (cmp.Args.Field === "drawer") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                            return <RndDrawer onClick={pressComponent} update={updateComponent} component={cmp} />
                        } else if (cmp.Args.Field === "textfield") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                            return <RndTextField onClick={pressComponent} update={updateComponent} component={cmp} />
                        } else if (cmp.Args.Field === "paper") {
                            //return viewParamField?.ID === cmp.ID ? <Focus><RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} /></Focus> : <RndAppBar onClick={pressComponent} update={updateComponent} component={cmp} />
                            return <RndPaper onClick={pressComponent} update={updateComponent} component={cmp} />
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
                <ParamFieldView close={() => { setViewParamField(undefined) }} component={viewParamField} update={updateComponent} /> : <div />}
        </div>
    );
};


export default PageView;