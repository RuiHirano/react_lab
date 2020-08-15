import { useSelector, useDispatch } from 'react-redux'
import { ReduxState } from './modules'
import { useCallback } from 'react'
import { Component, App, User } from '../types'
import { userActions } from './modules/user'


export const useRedux = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: ReduxState) => state.User)

  const updateUser = useCallback(async (user: User) => {
    dispatch(userActions.updateUser(user))
  }, [])

  const updateApp = useCallback(async (app: App) => {
    dispatch(userActions.updateApp(app))
  }, [])
  const addApp = useCallback(async (app: App) => {

    dispatch(userActions.addApp(app))

  }, [])
  const deleteApp = useCallback(async (app: App) => {

    dispatch(userActions.deleteApp(app))

  }, [])
  return { "updateUser": updateUser, "updateApp": updateApp, "deleteApp": deleteApp, "addApp": addApp }
}
