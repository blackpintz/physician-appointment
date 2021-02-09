import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Login } from '../../components/Login';

Enzyme.configure({ adapter: new Adapter() });

let rProps;
let onFetch;
let wrapper;

beforeEach(() => {
  rProps = {
    history: {
      push: jest.fn(),
    },
  };
  onFetch = jest.fn();
  wrapper = shallow(<Login onFetch={onFetch} routeProps={rProps} />);
});

test('should submit login form', () => {
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(wrapper.state('error')).toBeFalsy();
  expect(wrapper).toMatchSnapshot();
});

test('should set email on input change', () => {
  const value = 'user@example.com';
  wrapper.find('#email').simulate('change', {
    target: { value, name: 'email' },
  });
  expect(wrapper.state('email')).toBe(value);
});

test('should set password on input change', () => {
  const value = 'password';
  wrapper.find('#password').simulate('change', {
    target: { value, name: 'password' },
  });
  expect(wrapper.state('password')).toBe(value);
});

test('should call onSubmit for valid form submission', () => {
  wrapper.instance().handleLogin = jest.fn();
  wrapper.find('#password').simulate('change', {
    target: { value: 'password', name: 'password' },
  });
  wrapper.find('#email').simulate('change', {
    target: { value: 'user@example.com', name: 'email' },
  });
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(wrapper.instance().handleLogin).toBeCalled();
});
