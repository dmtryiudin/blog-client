import {screen, render, fireEvent} from "@testing-library/react";
import InputComponent from "../components/InputComponent";
import React from 'react'

const mockedData = {
    testFunc: () => {},
    testValue: 'hello'
}

describe('InputComponent compnent test', ()=>{
    test('fire function on input', ()=>{
        const spyTestFunc = jest.spyOn(mockedData, 'testFunc')

        render(<InputComponent changeHandler={mockedData.testFunc} inputValue={mockedData.testValue} type="text" />)

        expect(screen.getByTestId('input-component')).toContainHTML(mockedData.testValue)
        fireEvent.input(screen.getByTestId('input-component'), {
            target: {value: 'a'}
        })

        expect(spyTestFunc).toBeCalledTimes(1)
    })
})