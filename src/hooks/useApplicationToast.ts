import { UseToastOptions, useToast } from '@chakra-ui/react';

interface ToastProps {
  title: string;
  description: string;
}

const useApplicationToasts = () => {
  const toast = useToast();

  const toastError = ({ title, description }: ToastProps) => {
    toast({
      title,
      description,
      status: 'error',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };

  const toastSuccess = ({ title, description }: ToastProps) => {
    toast({
      title,
      description,
      status: 'success',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };

  return { toastError, toastSuccess };
};

export default useApplicationToasts;
