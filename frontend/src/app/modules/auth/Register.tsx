import { ReactElement, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { IRegisterForm, User } from './ducks/types';
import CopyRight from 'app/molecules/CopyRight';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { register } from './ducks/slice';
import { ApiValidationErrorsResponse } from 'shared/interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

const defaultValues: IRegisterForm = {
  name: '',
  email: '',
  password: '',
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, 'Password should contain min 8 characters')
      .required('Password is required'),
  })
  .required();

const Register = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const user = useAppSelector(({ auth }) => auth.user);
  const { control, setError, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user && (user || {}).id) {
      redirectUser(user);
    }
    /* eslint-disable-next-line */
  }, [user]);

  const onSubmit = (data: any) => {
    dispatch(register(data, onRegisterSuccess, onRegisterFail));
  };

  const onRegisterSuccess = (userResponse: User) => {
    redirectUser(userResponse);
  };

  const onRegisterFail = (backendErrors: ApiValidationErrorsResponse[]) => {
    backendErrors.forEach((err: ApiValidationErrorsResponse) => {
      setError(err.field, { type: 'manual', message: err.message });
    });
  };

  const redirectUser = (user: User) => {
    /* eslint-disable-next-line */
    navigate(location.state?.from?.pathname || '/');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit((d) => onSubmit(d))}
            sx={{ mt: 1 }}
          >
            <Controller
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    margin="normal"
                    id="name"
                    required
                    fullWidth
                    label="Full Name"
                    autoComplete="name"
                    autoFocus
                    error={fieldState && fieldState.error ? true : false}
                    helperText={fieldState && fieldState.error ? fieldState.error.message : ''}
                  />
                );
              }}
              name="name"
              control={control}
              rules={{ required: true }}
            />

            <Controller
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    margin="normal"
                    id="email"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    error={fieldState && fieldState.error ? true : false}
                    helperText={fieldState && fieldState.error ? fieldState.error.message : ''}
                  />
                );
              }}
              name="email"
              control={control}
              rules={{ required: true }}
            />

            <Controller
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={fieldState && fieldState.error ? true : false}
                    helperText={fieldState && fieldState.error ? fieldState.error.message : ''}
                  />
                );
              }}
              name="password"
              control={control}
              rules={{ required: true }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Already have an account? Sign Ip'}
                </Link>
              </Grid>
            </Grid>
            <CopyRight sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Register;
