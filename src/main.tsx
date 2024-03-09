import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

//redux
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error("Root element with id 'root' not found in the document.");
}

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// //redux
// import { Provider } from 'react-redux'
// import { store } from './store/store.ts'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store} >
//       <App />
//     </Provider>
//   </React.StrictMode >,
// )