import { useContext } from 'react';
import './App.css';
import { FretBoard } from './components/fretboard';
import { ScaleTable } from './components/scale-table';
import { Provider, DataContext } from './data/provider';
import { clearStateAction, setScaleTypeAction, ScaleType } from './data/reducer';

function AppContent() {
    const context = useContext(DataContext);

    const handleClear = () => {
        context?.dispatch(clearStateAction());
    };

    const handleSetScale = (scaleType: ScaleType) => {
        context?.dispatch(setScaleTypeAction(scaleType));
    };

    const currentScale = context?.state.scaleType || 'major';

    return (
        <div className="App">
            <div className="controls">
                <button onClick={handleClear}>Clear State</button>
                <div className="scale-buttons">
                    <button 
                        onClick={() => handleSetScale('major')}
                        className={currentScale === 'major' ? 'active' : ''}
                    >
                        Major
                    </button>
                    <button 
                        onClick={() => handleSetScale('minor')}
                        className={currentScale === 'minor' ? 'active' : ''}
                    >
                        Minor
                    </button>
                    <button 
                        onClick={() => handleSetScale('harmonicMinor')}
                        className={currentScale === 'harmonicMinor' ? 'active' : ''}
                    >
                        Harmonic Minor
                    </button>
                    <button 
                        onClick={() => handleSetScale('dorian')}
                        className={currentScale === 'dorian' ? 'active' : ''}
                    >
                        Dorian
                    </button>
                    <button 
                        onClick={() => handleSetScale('phrygian')}
                        className={currentScale === 'phrygian' ? 'active' : ''}
                    >
                        Phrygian
                    </button>
                    <button 
                        onClick={() => handleSetScale('lydian')}
                        className={currentScale === 'lydian' ? 'active' : ''}
                    >
                        Lydian
                    </button>
                    <button 
                        onClick={() => handleSetScale('pentatonicMinor')}
                        className={currentScale === 'pentatonicMinor' ? 'active' : ''}
                    >
                        Pentatonic Minor
                    </button>
                </div>
            </div>
            <FretBoard />
            <ScaleTable />
        </div>
    );
}

function App() {
    return (
        <Provider>
            <AppContent />
        </Provider>
    );
}

export default App;
