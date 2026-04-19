import { useReducer, ReactNode, createContext, Dispatch } from 'react';
import { reducer, initialState, Actions, Store } from './reducer';

export const DataContext = createContext<
    { state: Store; dispatch: Dispatch<Actions> } | undefined
>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};
