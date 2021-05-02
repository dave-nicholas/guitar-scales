import React, { useReducer } from 'react';
import { reducer, initialState, Actions, Store } from './reducer';

export const DataContext = React.createContext<
    { state: Store; dispatch: React.Dispatch<Actions> } | undefined
>(undefined);

export const Provider: React.FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};
