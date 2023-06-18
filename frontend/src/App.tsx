import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { appRoutes } from './constants/routes';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
