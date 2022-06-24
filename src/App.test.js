import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import Login from './features/User/Login'
import { screen,act } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

test('contains certain input', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/password/i)).toBeInTheDocument();
});

test('submits username and password', async () => {

  // ARRANGE
  const username = "demo";
  const password = "demo";
  const mockLogin = jest.fn();

  render(<Provider store={store}><Login onSubmit={mockLogin(username, password)} />
         </Provider>);
  const usernameInput = screen.getByRole('textbox', { name: /User Name/i });// to get the input by the label content 
  // we need to wrap each function that trigers state change with act() => () to solve “not wrapped in act” Errors
  act(() => (userEvent.type(usernameInput, 'demo')));//to type into the input assigned 
  const passwordInput = screen.getByLabelText('Password');
  // we need to wrap each function that trigers state change with act() => () to solve “not wrapped in act” Errors
  act(() => (userEvent.type(passwordInput, 'demo')));//to type into the input assigned 
  const loginButton = screen.getByRole('button', { name: /^Sign in$/i }); // to assign the sign in btn to a const to be later clicked
  expect(loginButton).not.toBeDisabled();

  // ACT
  userEvent.click(loginButton);

  // ASSERT
  await expect(mockLogin).toHaveBeenCalled();// to ensure that a mock function got called
  await expect(mockLogin).toHaveBeenCalledTimes(1);// to ensure that a mock function got called exact number of times
  await expect(mockLogin).toHaveBeenCalledWith("demo", "demo");// to ensure that a mock function was called with specific arguments
});
