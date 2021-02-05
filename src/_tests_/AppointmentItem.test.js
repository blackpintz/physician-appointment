import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AppointmentItem from '../components/AppointmentItem';
import appointments from './fixtures/appointments';

Enzyme.configure({ adapter: new Adapter() });

test('should render AppointmentItem component', () => {
  const wrapper = shallow(<AppointmentItem item={appointments[0]} />);
  expect(wrapper).toMatchSnapshot();
});
