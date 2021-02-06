import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Menu from '../../components/Menu';

Enzyme.configure({ adapter: new Adapter() });

test('should render Menu component', () => {
  const wrapper = shallow(<Menu />);
  expect(wrapper).toMatchSnapshot();
});
