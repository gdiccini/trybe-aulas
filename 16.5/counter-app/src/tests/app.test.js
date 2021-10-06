import React from 'react';
import { cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRedux from '../renderWithRedux';
import userEvent from '@testing-library/user-event';

describe('testing clicks', () => {
  beforeEach(cleanup);
  test('the page should has a button and a text 0', () => {
    const { queryByText } = renderWithRedux(<App />);
    const buttonAdicionar = queryByText('Clique aqui');

    expect(buttonAdicionar).toBeInTheDocument();
    expect(queryByText('0')).toBeInTheDocument();
  });

  it('test button click', () => {
    const { queryByText } = renderWithRedux(<App />);
    const btn = queryByText('Clique aqui');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const afterClick = queryByText('1');
    expect(afterClick).toBeInTheDocument();
  })

  it('test click with initial value 10', () => {
    const { queryByText } = renderWithRedux(<App />, { initialState: { clickReducer: { counter: 10 }}});
    const btn = queryByText('Clique aqui');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const afterClick = queryByText('11');
    expect(afterClick).toBeInTheDocument();
  })
});
