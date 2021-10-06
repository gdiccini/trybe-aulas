import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verifica que há um campo input de email na tela', () => {
  // Acessa os elementos da sua tela
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');

  // Fazer seu teste
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

test('Verifica que há dois botões', () => {
  const { getAllByRole } = render(<App />);
  const button = getAllByRole('button');

  expect(button.length).toBe(2);
});