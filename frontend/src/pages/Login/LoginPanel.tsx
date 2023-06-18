import { FC } from 'react';

import MainBackground from '../../components/MainBackground/MainBackground';
import LoginPanelForm from './components/LoginPanelForm/LoginPanelForm';

const LoginPanel: FC = () => {
  return (
    <MainBackground>
      <LoginPanelForm />
    </MainBackground>
  );
};

export default LoginPanel;
