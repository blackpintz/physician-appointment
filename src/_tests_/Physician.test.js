import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Physician } from '../components/Physician';

Enzyme.configure({ adapter: new Adapter() });

let rProps;
let wrapper;

beforeEach(() => {
  rProps = {
    history: {
      push: jest.fn(),
    },
  };
  wrapper = shallow(<Physician physicianId="2" user={1} routeProps={rProps} />);
});

test('submit button should enable after inputting three letters', () => {
  wrapper.find('#city').simulate('change', {
    target: { value: 'Kisii', name: 'city' },
  });
  expect(wrapper.find('.w-75').props().disabled).toBeFalsy();
});
