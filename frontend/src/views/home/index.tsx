import React from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/modules";
import { App } from "../../types";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useRedux } from "../../redux/useRedux";


interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const Home: React.FC<Props> = (props) => {
    const { history } = props
    const user = useSelector((state: ReduxState) => state.User)
    const apps: App[] = Object.values(user.Apps)
    console.log("user: apps ", user, apps)
    const { addApp } = useRedux()

    const addNewApp = () => {
        const title = "TestApp"
        const app: App = new App()
        app.Title = title
        addApp(app)
    }
    return (
        <div>
            <Typography>Home</Typography>
            <Button variant={"contained"} onClick={() => { addNewApp() }}>{"アプリを追加する"}</Button>
            {apps.map((app: App) => (
                <div key={app.ID} onClick={() => { history.push(`/editor/${app.ID}`) }}>
                    <Paper elevation={3} style={{ width: 300, height: 300, margin: 50 }}>
                        <Typography>{app.Title}</Typography>
                        <Typography>{app.Description}</Typography>
                    </Paper>
                </div>
            ))}
        </div>
    );
};


export default withRouter(Home);