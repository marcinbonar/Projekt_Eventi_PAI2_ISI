import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

const MainBackground: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage="url('https://cdn.pixabay.com/photo/2015/11/22/19/04/crowd-1056764_1280.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      {children}
    </Flex>
  );
};

export default MainBackground;
