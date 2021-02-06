import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AppointmentList from '../../components/AppointmentList';

Enzyme.configure({ adapter: new Adapter() });

test('should render AppointmentList component', () => {
  const wrapper = shallow(<AppointmentList />);
  expect(wrapper).toMatchSnapshot();
});
