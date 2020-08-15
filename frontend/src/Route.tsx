import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Editor, Home, Monitor } from "./views";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route
                exact path="/"
                component={Home}
            />
            <Route
                exact path="/editor/:appId"
                component={Editor}
            />
            <Route
                exact path="/monitor/:appId"
                component={Monitor}
            />

        </Switch>
    );
};

export default Routes;