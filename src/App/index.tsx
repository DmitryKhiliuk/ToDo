import * as appSelectors from './selectors'
import {asyncActions, slice, RequestStatusType as T1} from "./app-reducer";



const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...asyncActions
}
export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions
}
