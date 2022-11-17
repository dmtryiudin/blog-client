import {screen, render} from "@testing-library/react";
import PostPreview from "../components/PostPreview";
import React from 'react'

describe('PostPreview component test', ()=>{
    test('component works with no error', ()=>{
        render(<PostPreview id={'1'} img={''} title={'test post'} />)
        expect(screen.getByTestId('post-preview')).toBeInTheDocument()
        expect(screen.getByText('test post')).toBeInTheDocument()
    })
})