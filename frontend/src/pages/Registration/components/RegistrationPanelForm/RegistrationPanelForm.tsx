import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { registrationSchema } from '../../../../constants/constants';
import { ROUTE_CONSTANTS } from '../../../../constants/routesConstants';
import useApplicationToasts from '../../../../hooks/useApplicationToast';
import { useRegisterUserMutation } from '../../../../redux/user/userApi';

type FormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationPanelForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registrationSchema),
  });

  const { toastError, toastSuccess } = useApplicationToasts();

  const onSubmit = async (data: FormValues) => {
    try {
      const user = await registerUser({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(user);
      navigate(ROUTE_CONSTANTS.LOGIN);
      toastSuccess({
        title: 'Rejestracja pomyślna',
        description: 'Zaloguj się do swojej aplikacji',
      });
    } catch (error: any) {
      console.log('Błąd podczas rejestracji:', error);
      let message = 'Skontaktuj się z administratorem';
      if (error.data) {
        message = error.data;
      }
      toastError({
        title: 'Błąd rejestracji',
        description: message,
      });
    }
  };

  return (
    <Stack spacing={5} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'} />
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Heading color={'black'} fontSize={'4xl'} textAlign={'center'}>
              Zarejestruj się
            </Heading>
            <HStack>
              <Box>
                <FormControl id="name">
                  <FormLabel>Imię</FormLabel>
                  <Input type="text" {...register('name')} />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Nazwisko</FormLabel>
                  <Input type="text" {...register('surname')} />
                  {errors.surname && (
                    <Text color="red">{errors.surname.message}</Text>
                  )}
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email">
              <FormLabel>Adres email</FormLabel>
              <Input type="email" {...register('email')} />
              {errors.email && <Text color="red">{errors.email.message}</Text>}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Hasło</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red">{errors.password.message}</Text>
              )}
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Potwierdź hasło</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <Text color="red">{errors.confirmPassword.message}</Text>
              )}
            </FormControl>
            <Stack spacing={5} pt={2}>
              <Button
                type="submit"
                loadingText="Trwa przetwarzanie"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Zarejestruj się
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Jesteś już zarejestrowany?{' '}
                <Link color={'blue.400'}>Zaloguj się</Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default RegistrationPanelForm;
