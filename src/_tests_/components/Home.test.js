import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Home } from '../../components/Home';
import physician from '../fixtures/physicians';

Enzyme.configure({ adapter: new Adapter() });

test('should render Home component', () => {
  const onFetch = jest.fn();
  const wrapper = shallow(<Home onFetch={onFetch} physician={physician} />);
  expect(wrapper).toMatchSnapshot();
});
