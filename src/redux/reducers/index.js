import { combineReducers } from 'redux'

import pricing from './pricing'

const rootReducer = combineReducers({
    pricing: pricing
});

export default rootReducer;
