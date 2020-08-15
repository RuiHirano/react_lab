import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { User, App } from '../../../types';
import * as lodash from 'lodash'
const _ = lodash

const actionCreator = actionCreatorFactory();



export const initialState: User = new User()

export enum UserActions {
	UPDATE_USER = "UPDATE_USER",
	UPDATE_APP = "UPDATE_APP",
	ADD_APP = "ADD_APP",
	DELETE_APP = "DELETE_APP",
}

export const userActions = {
	updateUser: actionCreator<User>(UserActions.UPDATE_USER),
	updateApp: actionCreator<App>(UserActions.UPDATE_APP),
	addApp: actionCreator<App>(UserActions.ADD_APP),
	deleteApp: actionCreator<App>(UserActions.DELETE_APP),
};

const userModule = reducerWithInitialState(initialState)
	.case(userActions.updateUser, (state, action) => {
		const user = action
		return user
	})
	.case(userActions.updateApp, (state, action) => {
		const app: App = action
		const user = _.cloneDeep(state)
		const newApps = user.Apps
		for (let key in user.Apps) {
			if (user.Apps[key].ID === app.ID) {
				newApps[key] = app // update app
			}
		}
		user.Apps = newApps
		return user
	})
	.case(userActions.addApp, (state, action) => {
		const app: App = action
		const user = _.cloneDeep(state)
		user.Apps[app.ID] = app
		return user
	})
	.case(userActions.deleteApp, (state, action) => {
		const app: App = action
		const user = _.cloneDeep(state)
		delete user.Apps[app.ID]
		return user
	})

export default userModule