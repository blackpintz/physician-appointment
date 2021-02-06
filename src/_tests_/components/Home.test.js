import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Home from '../../components/Home';

Enzyme.configure({ adapter: new Adapter() });

test('should render AppointmentList component', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});
