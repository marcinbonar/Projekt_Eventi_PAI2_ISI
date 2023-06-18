import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Types } from './types';

const NavItem = ({ icon, children, route, ...rest }: Types) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
