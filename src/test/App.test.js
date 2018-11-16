import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import movies$ from '../mock/movies';
 
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () =>
{
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


