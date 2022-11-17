import {screen, render, fireEvent} from "@testing-library/react";
import Pagination from "../components/Pagination";
import React from "react";

const mockedData = {
    setValue: (a:number)=>{},
    value:0,
    limit:10,
    itemsCount: 100
}

describe('Pagination component test', ()=>{
    test('Pagination component test', ()=>{
        const spySetValue = jest.spyOn(mockedData, 'setValue')

        render(
            <Pagination
                setValue={mockedData.setValue}
                value={mockedData.value}
                limit={mockedData.limit}
                itemsCount={mockedData.itemsCount}
            />
        )
        fireEvent.click(screen.getByTestId('pagination-button2'))

        expect(spySetValue).toBeCalledTimes(0)

        fireEvent.click(screen.getByTestId('pagination-button1'))

        expect(spySetValue).toBeCalledTimes(1)
        expect(screen.getByText(mockedData.value + '-' + (mockedData.value + mockedData.limit))).toBeInTheDocument()
    })
})