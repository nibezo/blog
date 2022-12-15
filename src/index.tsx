import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.scss';
import { store } from './redux/store';

const root = ReactDOMClient.createRoot(document.querySelector('.root') as HTMLAnchorElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
