import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

it('Renders the component', () => {
    const div = document.createElement('div');

    ReactDom.render('<App />', div);
    ReactDom.unmountComponentAtNode(div);
});
