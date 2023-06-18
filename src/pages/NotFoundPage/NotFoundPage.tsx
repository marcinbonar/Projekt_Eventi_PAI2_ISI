import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../constants/routesConstants';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTE_CONSTANTS.LOGIN);
  };

  return (
    <Center h="100vh" w="100%" flexDirection="column">
      <VStack spacing={5}>
        <Heading size="2xl">404</Heading>
        <Text fontSize="xl">Strona nie została znaleziona</Text>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          onClick={handleGoBack}
        >
          Wróć
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFoundPage;
