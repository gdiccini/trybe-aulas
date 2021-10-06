import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

test('Verifica que, quando recebo uma pidada ela é mostrada na tela', async () => {
  const joke = {
    id: '7h3oGtr0fxc',
    joke: 'Whiteboards ... are remarkable',
    status: 200,
  };

  const title = screen.getByRole('heading', {
    level: 1,
    name: 'Meu cabeçalho'
  })

  // const response = { json: jest.fn().mockImplementation(() => Promise.resolve(joke))}
  // const response = { json: jest.fn(() => Promise.resolve(joke))};
  // const response = { json: jest.fn().mockResolvedValue(joke) };

  // global.fetch = jest.fn().mockResolvedValue(response);

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(joke)
  });

  const { findByText } = render(<App/>);

  await findByText('Whiteboards ... are remarkable');

  // waitFor(() => findByText('Whiteboards ... are remarkable'));

});

