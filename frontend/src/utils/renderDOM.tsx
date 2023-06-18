import { FC, ReactNode } from 'react';
import store from '../redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const WithProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider
    store={store}><ChakraProvider><BrowserRouter>{children}</BrowserRouter></ChakraProvider></Provider>;
};

const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: WithProviders, ...options });

export { renderWithProviders as renderDOM };