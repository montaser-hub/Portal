import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import myStore  from '../app/Redux/store';
import App from './app';
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={myStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
});
});
