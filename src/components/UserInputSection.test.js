const React = require('react');
const ReactDom = require('react-dom');
const Enzyme = require('enzyme');
const { mount, configure, shallow, render } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { expect } = require('chai');
import UserInputSection from './UserInputSection';

Enzyme.configure({
    adapter: new Adapter()
});

it('Renders the component', () => {
    const div = document.createElement('div');

    ReactDom.render('<UserInputSection />', div);
    ReactDom.unmountComponentAtNode(div);
});

describe("<UserInputSection />", function() {
    it('Should Render login <UserInputSection /> component without erroe', () => {
        const userInputSection = shallow(<UserInputSection />);
    });
  });