import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Physician from '../components/Physician';

Enzyme.configure({ adapter: new Adapter() });

test('should render Physician component', () => {
  const wrapper = shallow(<Physician />);
  expect(wrapper).toMatchSnapshot();
});

test('submit button should enable after inputting three letters', () => {
  const rProps = {
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Physician routeProps={rProps} id={2} />);
  wrapper.find('#city').simulate('change', {
    target: { value: 'Kisii', name: 'city' },
  });
  expect(wrapper.find('.w-75')).toBeEnabled();
});
