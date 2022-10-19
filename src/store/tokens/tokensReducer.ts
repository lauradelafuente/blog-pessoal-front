import {Action} from './actions';

export interface TokenState {
    tokens:string;
    id: string
}

const initialState = {
    tokens: '',
    id: ''
} //valor inicial é um valor vazio

export const tokenReducer = (state: TokenState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": {
            return {tokens:action.payload, id: state.id}
        }; //se o type for addtoken, a propriedade tokens recebe o payload(token preenchido) dentro de actions
        case "ADD_ID": {
            return {id:action.payload, tokens: state.tokens}
        }
        default:
            return state 
    }//retorna o estado vazio
}
