import {screen, render, fireEvent} from "@testing-library/react";
import SubmitRemoval from "../components/SubmitRemoval";
import React from 'react'

const mockedData = {
    hideModal: ()=>{},
    removeHandler: ()=>{}
}

describe('SubmmitRemovat component test', ()=>{
    test('component works with no error', ()=>{
        const spyHideModal = jest.spyOn(mockedData, 'hideModal')
        const spyRemoveHandler = jest.spyOn(mockedData, 'removeHandler')

        render(<SubmitRemoval
            isShow={true}
            hideModal={mockedData.hideModal}
            removeHandler={mockedData.removeHandler}
        />)

        fireEvent.click(screen.getByText('No'))
        expect(spyHideModal).toBeCalledTimes(1)

        fireEvent.click(screen.getByText('Yes'))
        expect(spyRemoveHandler).toBeCalledTimes(1)

        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })
})