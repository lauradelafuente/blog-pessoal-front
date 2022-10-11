import {Action} from './actions';

export interface TokenState {
    tokens:string;
}

const initialState = {
    tokens: ''
} //valor inicial é um valor vazio

export const tokenReducer = (state: TokenState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": {
            return {tokens:action.payload}
        } //se o type for addtoken, a propriedade tokens recebe o payload(token preenchido) dentro de actions
        default:
            return state 
    }//retorna o estado vazio
}
