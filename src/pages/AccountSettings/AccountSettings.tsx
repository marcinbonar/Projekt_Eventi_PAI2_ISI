import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import SideBar from '../../components/SideBar/SideBar';
import { changePasswordSchema } from '../../constants/constants';
import useApplicationToast from '../../hooks/useApplicationToast';
import { RootState } from '../../redux/store';
import { useChangePasswordMutation } from '../../redux/user/userApi';
import { FormValues } from './types';

const UserProfileEdit: FC = () => {
  const { toastError, toastSuccess } = useApplicationToast();
  const [changePassword] = useChangePasswordMutation();
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!userId) return;
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.password,
        userId,
      }).unwrap();

      toastSuccess({
        title: 'Status zadania',
        description: 'Hasło zostało pomyślnie zmienione',
      });
    } catch (error: any) {
      toastError({
        title: 'Status zadania',
        description: error.data.message ?? 'Skontaktuj się z administratorem',
      });
    }
  };

  return (
    <SideBar>
      <Flex
        minH='89vh'
        align='center'
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={2}
          my={2}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Edytuj swój profil
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id='password'>
              <FormLabel>Hasło</FormLabel>
              <Input
                placeholder='Podaj nowe hasło'
                _placeholder={{ color: 'gray.500' }}
                type='password'
                {...register('password')}
              />
              <span style={{ color: 'red' }}>{errors.password?.message}</span>
            </FormControl>
            <FormControl id='confirmPassword'>
              <FormLabel>Potwierdź hasło</FormLabel>
              <Input
                placeholder='Potwierdź nowe hasło'
                _placeholder={{ color: 'gray.500' }}
                type='password'
                {...register('confirmPassword')}
              />
              <span style={{ color: 'red' }}>
                {errors.confirmPassword?.message}
              </span>
            </FormControl>
            <FormControl id='oldPassword'>
              <FormLabel>Stare Hasło</FormLabel>
              <Input
                placeholder='Podaj stare hasło'
                _placeholder={{ color: 'gray.500' }}
                type='password'
                {...register('oldPassword')}
              />
              <span style={{ color: 'red' }}>
                {errors.oldPassword?.message}
              </span>
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                type='submit'
                bg={'blue.400'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'cyan.400',
                }}
              >
                Zapisz
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </SideBar>
  );
};

export default UserProfileEdit;
