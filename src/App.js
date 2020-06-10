import React from 'react'
import 'antd/dist/antd.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './redux/reducers';
import Pricing from './components/pricing'

const initialState = {}
const store = createStore(reducer, initialState);

function App() {
  return (
      <Provider store={store}>
        <Pricing/>
      </Provider>
  );
}

export default App;
