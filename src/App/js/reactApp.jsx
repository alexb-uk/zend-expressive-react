import Helloworld from './components/helloworld.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

$( document ).ready(function() {
    ReactDOM.render(
        <Helloworld date={new Date()} />,
        document.getElementById("root")
    );
});
