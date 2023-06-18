import {
  Box,
  Button,
  Center, Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginSchema } from '../../../../constants/constants';
import { ROUTE_CONSTANTS } from '../../../../constants/routesConstants';
import useApplicationToast from '../../../../hooks/useApplicationToast';
import { useLoginUserByGoogleMutation, useLoginUserMutation } from '../../../../redux/user/userApi';
import { setUserId } from '../../../../redux/user/userSlice';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

type FormData = {
  email: string;
  password: string;
};

const clientId = '585109083788-bqv3hnp30p2idpa54no8edgfi70f1q7b.apps.googleusercontent.com';

const LoginPanelForm: FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const { toastError } = useApplicationToast();
  const dispatch = useDispatch();
  const [loginUserByGoogle] = useLoginUserByGoogleMutation();

  const handleGoogleSuccess = async (res: any) => {
    try {
      const idToken = res?.tokenId;
      if (idToken) {
        const user = await loginUserByGoogle({ idToken }).unwrap();
        sessionStorage.setItem('userId', user.userId as string);
        dispatch(setUserId(user.userId!));
        console.log(user);

        if (user.role === 'ADMIN') {
          navigate(ROUTE_CONSTANTS.DASHBOARD_ADMIN);
        } else {
          navigate(ROUTE_CONSTANTS.DASHBOARD);
        }
      }
    } catch (error: any) {
      toastError({
        title: 'UWAGA',
        description: error.data,
      });
    }
  };

  const handleGoogleFailure = (res: any) => {
    if (res.error === 'popup_closed_by_user') {
      toastError({
        title: 'Logowanie przerwane',
        description: 'Proces logowania przez Google został przerwany. Spróbuj ponownie.',
      });
    } else {
      toastError({
        title: 'Błąd logowania przez Google',
        description: 'Nie udało się zalogować przez Google. Spróbuj ponownie.',
      });
    }
  };

  const handleRegisterClick = () => {
    navigate(ROUTE_CONSTANTS.REGISTER);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (data) {
        const user = await loginUser(data).unwrap();
        sessionStorage.setItem('userId', user.userId as string);
        dispatch(setUserId(user.userId!));


        if (user.role === 'ADMIN') {
          navigate(ROUTE_CONSTANTS.DASHBOARD_ADMIN);
        } else {
          navigate(ROUTE_CONSTANTS.DASHBOARD);
        }
      }
    } catch (error: any) {
      toastError({
        title: 'Błąd logowania',
        description: error.data.message ?? 'Skontaktuj się z administratorem',
      });
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
  });

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'} />
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading color={'black'} fontSize={'4xl'} mb={4}>
            Zaloguj się do aplikacji
          </Heading>
          <Text fontSize={'lg'} color={'black'} align={'center'} mb={4}>
            Bo życie to chwile które należy pamiętać
          </Text>
          <Stack spacing={4}>
            <FormControl id='email' isInvalid={!!errors.email}>
              <FormLabel>Email </FormLabel>
              <Input {...register('email')} type='email' />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id='password' isInvalid={!!errors.password}>
              <FormLabel>Hasło</FormLabel>
              <Input {...register('password')} type='password' />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button
                type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Zaloguj się
              </Button>
              <Button
                variant='outline'
                colorScheme='blue'
                _hover={{ bg: 'blue.50' }}
                onClick={handleRegisterClick}
              >
                Zarejestruj się
              </Button>
            </Stack>
          </Stack>
        </form>
        <Stack mt={4} spacing={2} align={'center'} maxW={'md'} w={'full'}>
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                w={'full'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
              >
                Zaloguj się przez Gmaila
              </Button>
            )}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default LoginPanelForm;
