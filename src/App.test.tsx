import {screen, render} from '@testing-library/react'
import App from "./App";
import {Provider} from "react-redux";
import {persistor, store} from '../src/store/store'
import {PersistGate} from "redux-persist/integration/react";

test('gggg', ()=>{
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
})