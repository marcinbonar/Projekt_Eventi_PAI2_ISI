import * as yup from 'yup';
import * as Yup from 'yup';

export const registrationSchema = yup.object().shape({
  name: yup.string().required('Imię jest wymagane'),
  surname: yup.string().required('Nazwisko jest wymagane'),
  email: yup
    .string()
    .email('Niepoprawny email')
    .required('To pole jest wymagane'),
  password: yup
    .string()
    .required('To pole jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Hasła nie są takie same')
    .required('To pole jest wymagane'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Niepoprawny email')
    .required('To pole jest wymagane'),
  password: yup.string().required('To pole jest wymagane'),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Pole jest wymagane'),
  password: Yup.string()
    .required('Pole jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Hasła muszą być takie same'
  ),
});
