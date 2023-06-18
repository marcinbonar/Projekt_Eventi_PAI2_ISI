import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import SideBarForAdmin from '../../components/SideBar/SideBarForAdmin';
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from '../../redux/user/userApi';
import { User } from '../../types/user';
import UserRow from './components/UserRow/UserRow';

const BlockUsers: FC = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const handleBlock = async (user: User) => {
    await blockUser(user.email).unwrap();
  };

  const handleUnblock = async (user: User) => {
    await unblockUser(user.email).unwrap();
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas ładowania użytkowników.</div>;
  }

  return (
    <SideBarForAdmin>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" aria-label={'User Table'}>
          <TableCaption>Zarządzaj użytkownikami aplikacji</TableCaption>
          <Thead>
            <Tr>
              <Th>Imie</Th>
              <Th>Nazwisko</Th>
              <Th>e-mail</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users
              ?.filter((user) => user.role !== 'ADMIN')
              .map((user) => (
                <UserRow
                  key={user.email}
                  name={user.name}
                  surname={user.surname}
                  email={user.email}
                  isBlocked={user.isBlocked ?? false}
                  onBlock={() => handleBlock(user)}
                  onUnblock={() => handleUnblock(user)}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SideBarForAdmin>
  );
};

export default BlockUsers;
