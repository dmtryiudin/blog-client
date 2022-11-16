import {screen, render} from '@testing-library/react'
import ErrorMessage from "../src/components/ErrorMessage";

describe('ErrorMessage test', ()=>{
    test('Text exists', ()=>{
        render(<ErrorMessage message={'new error'} />)

        expect(screen.getByText(/new error/i)).toBeInTheDocument()
    })

    test('No text', ()=>{
        render(<ErrorMessage message={''} />)

        expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
})
