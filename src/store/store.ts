import { tokenReducer } from './tokens/tokensReducer';
import { legacy_createStore as createStore} from 'redux'; 

const store = createStore(tokenReducer);

export default store;

