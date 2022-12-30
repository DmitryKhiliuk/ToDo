import React from 'react'
import axios from "axios";
import {TodolistDomainType} from "./types";
import fn = jest.fn;

jest.mock('axios')
const mock = jest.spyOn(axios, 'create')
const mockedAxios = axios as jest.Mocked<typeof axios>;

let response: any

describe('api test', () => {
    beforeEach(() => {
        response = [
            {
                id: '1',
                title: 'title',
                addedDate: 'date',
                order: 1,
                filter: 'all',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'title two',
                addedDate: 'date two',
                order: 2,
                filter: 'all',
                entityStatus: 'idle'
            }
        ]

    })
    it('', () => {
        mockedAxios.get.mockReturnValue(response)
        expect(jest.fn()).toBeCalledTimes(1)
    })
})