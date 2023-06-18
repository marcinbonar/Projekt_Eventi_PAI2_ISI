import { Button, HStack, Td, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';

import useApplicationToast from '../../../../hooks/useApplicationToast';
import { UserRowProps } from './types';

const UserRow: FC<UserRowProps> = ({
  name,
  surname,
  email,
  isBlocked: isBlockedProp,
  onBlock,
  onUnblock,
}) => {
  const { toastError, toastSuccess } = useApplicationToast();

  const handleBlock = async () => {
    try {
      await onBlock();
      toastSuccess({
        title: 'Status',
        description: 'Użytkownik został zablokowany',
      });
    } catch (error) {
      toastError({
        title: 'Status',
        description: 'Nie udało się zablokować użytkownika',
      });
    }
  };

  const handleUnblock = async () => {
    try {
      await onUnblock();
      toastSuccess({
        title: 'Status',
        description: 'Użytkownik został odblokowany',
      });
    } catch (error) {
      toastError({ title: 'Status', description: 'Wystąpił błąd' });
    }
  };

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{surname}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack spacing={4}>
          <Button
            size="sm"
            onClick={handleBlock}
            colorScheme="red"
            disabled={isBlockedProp}
          >
            Zablokuj
          </Button>
          <Button
            size="sm"
            onClick={handleUnblock}
            colorScheme="blue"
            disabled={!isBlockedProp}
          >
            Odblokuj
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default UserRow;
