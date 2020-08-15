import React, { useState, useEffect } from "react";
import { Typography, AppBar, Toolbar, IconButton, Drawer, ListItem, ListItemIcon, ListItemText, List, makeStyles, Paper, Button } from "@material-ui/core";
import { Component, ButtonArgs, AppBarArgs, TypographyArgs, TextFieldArgs, PaperArgs, DrawerArgs, App, Page } from "../../types";
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/modules";
import { withRouter, match } from "react-router";
import * as H from "history";
import PageView from "./page";
import * as lodash from 'lodash'
import { useRedux } from "../../redux/useRedux";
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

interface Props {
    history: H.History;
    location: H.Location;
    match: match<{ appId: string }>;
}

const Editor: React.FC<Props> = (props) => {
    const { match } = props
    const user = useSelector((state: ReduxState) => state.User)
    const app = user.Apps[match.params.appId]
    const pages = Object.values(app.Pages)
    //const [pages, setPages] = useState<Page[]>(Object.values(app.Pages))
    const [page, setPage] = useState<Page>(pages[0]) // exist at least 1 page
    console.log("debug", app, pages)
    const { addApp } = useRedux()

    const classes = useStyles();

    const addPage = () => {
        const newApp: App = _.cloneDeep(app)
        const newPage: Page = new Page()
        newPage.Num = pages.length
        newApp.Pages[newPage.ID] = newPage
        addApp(newApp)
    }

    const changePage = (page: Page) => {
        setPage(page)
    }

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar >
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {"React Lab"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant={"permanent"} anchor={"left"} open={true} onClose={() => { }}>
                <List style={{ width: 300, marginTop: appBarHeight }}>
                    <Button variant={"contained"} onClick={() => addPage()}>{"ページを追加"}</Button>
                    {pages.map((page: Page) => (
                        <Paper className={classes.paper} key={page.ID} onClick={() => changePage(page)}>
                            {`${page.Num + 1}ページ目`}
                        </Paper>
                    ))}
                </List>
            </Drawer>
            <PageView appId={app.ID} pageId={page.ID} />
        </div >
    );
};


export default withRouter(Editor);