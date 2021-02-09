import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AppointmentList } from '../../components/AppointmentList';
import appointment from '../fixtures/appointments';

Enzyme.configure({ adapter: new Adapter() });

test('should render AppointmentList component', () => {
  const onFetch = jest.fn();
  const wrapper = shallow(<AppointmentList onFetch={onFetch} appointment={appointment} />);
  expect(wrapper).toMatchSnapshot();
});
