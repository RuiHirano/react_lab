import { combineReducers } from 'redux'
//import appModule from './app'
import { User } from '../../types'
import userModule from './user'

export interface ReduxState {
	User: User
}

const combineModules = combineReducers<ReduxState>({
	User: userModule,
})

export default combineModules
