import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOMClient.createRoot(document.querySelector('.root') as HTMLAnchorElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
