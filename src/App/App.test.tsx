import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "./App";
import * as reduxHooks from "react-redux";
import {InitialStateType} from "./app-reducer";

let startState: InitialStateType

jest.mock('react-redux')
const mockedSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')
const dispatch = jest.fn()

describe('app test', () => {

    beforeEach(() => {
        startState = {
            error: null,
            status: 'idle',
            isInitialized: true
        }
    })

    it('app render test', () => {
        mockedSelector.mockReturnValue(startState)
        mockedDispatch.mockReturnValue(dispatch)
        const view = render(<MemoryRouter><App/></MemoryRouter>)
        expect(view).toMatchSnapshot()
    })
})