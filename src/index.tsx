import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const rootId = process.env.REACT_APP_ROOT_ID || 'root';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById(rootId)
);
