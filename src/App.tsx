// eslint-disable-next-line
import React from 'react';
import './App.css';
import { FretBoard } from './components/fretboard';
import { Provider } from './data/provider';

function App() {
    return (
        <div className="App">
            <Provider>
                <FretBoard />
            </Provider>
        </div>
    );
}

export default App;
