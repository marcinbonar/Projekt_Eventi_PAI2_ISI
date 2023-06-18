import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import Logo1 from '../../LogoFolder/Logo1.png';
import Logo from '../../LogoFolder/Logo.png';
import NavItem from '../NavItem/NavItem';
import { LinkItems } from '../constants';
import { Types } from './types';

const SidebarContent = ({ onClose, ...rest }: Types) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={colorMode === 'light' ? Logo : Logo1}
          alt="Logo"
          w={
            colorMode === 'light' ? { base: 50, md: 12 } : { base: 60, md: 14 }
          }
          h={
            colorMode === 'light' ? { base: 30, md: 12 } : { base: 36, md: 14 }
          }
          borderRadius={'3px'}
        />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} aria-label="close-button"/>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
