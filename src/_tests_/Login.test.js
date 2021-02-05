import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from '../components/Login';

Enzyme.configure({ adapter: new Adapter() });

test('should submit login form', () => {
  const rProps = {
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Login routeProps={rProps} />);
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(wrapper.state('error')).toBeFalsy();
  expect(wrapper).toMatchSnapshot();
});

test('should set email on input change', () => {
  const value = 'user@example.com';
  const rProps = {
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Login routeProps={rProps} />);
  wrapper.find('#email').simulate('change', {
    target: { value, name: 'email' },
  });
  expect(wrapper.state('email')).toBe(value);
});

test('should set password on input change', () => {
  const value = 'password';
  const rProps = {
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Login routeProps={rProps} />);
  wrapper.find('#password').simulate('change', {
    target: { value, name: 'password' },
  });
  expect(wrapper.state('password')).toBe(value);
});

test('should call onSubmit for valid form submission', () => {
  const rProps = {
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = shallow(<Login routeProps={rProps} />);
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
