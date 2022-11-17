import {screen, render} from '@testing-library/react'
import ErrorMessage from "../components/ErrorMessage";
import React from 'react'

describe('ErrorMessage component test', ()=>{
    test('Text exists', ()=>{
        render(<ErrorMessage message={'new error'} />)

        expect(screen.getByText(/new error/i)).toBeInTheDocument()
    })

    test('No text', ()=>{
        render(<ErrorMessage message={''} />)

        expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
})
