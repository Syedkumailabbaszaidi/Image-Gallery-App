import { ReactElement, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { ILoginForm, User } from './ducks/types';
import CopyRight from 'app/molecules/CopyRight';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { login } from './ducks/slice';
import { ApiValidationErrorsResponse } from 'shared/interfaces';
import { decrypt, encrypt } from 'utils/encryption';
import { useNavigate } from 'react-router-dom';

const defaultValues: ILoginForm = {
  email: '',
  password: '',
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, 'Password should contain min 8 characters')
      .required('Password is required'),
  })
  .required();

const Login = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ auth }) => auth.user);
  const [rememberCheck, setRememberCheck] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  const { control, getValues, setError, setValue, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    populateForm();
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (user && (user || {}).id) {
      redirectUser(user);
    }
    /* eslint-disable-next-line */
  }, [user]);

  const onSubmit = (data: any) => {
    dispatch(login(data, onLoginSuccess, onLoginFail));
  };

  const onLoginSuccess = (userResponse: User) => {
    saveLoginDataToCookie();
    redirectUser(userResponse);
  };

  const onLoginFail = (backendErrors: ApiValidationErrorsResponse[]) => {
    backendErrors.forEach((err: ApiValidationErrorsResponse) => {
      setError(err.field, { type: 'manual', message: err.message });
    });
  };

  const saveLoginDataToCookie = () => {
    if (rememberCheck) {
      const data: ILoginForm = getValues();
      const cookieData = encrypt(JSON.stringify(data));
      setCookie('login', cookieData, { path: '/' });
    } else {
      removeCookie('login');
    }
  };

  const redirectUser = (user: User) => {
    navigate('/');
  };

  const handleRememberCheck = () => {
    setRememberCheck(!rememberCheck);
  };

  const populateForm = () => {
    if (cookies && cookies.login) {
      const encryptedData = cookies.login;
      const decryptedData = JSON.parse(decrypt(encryptedData));
      if (decryptedData) {
        if (decryptedData.email) {
          setValue('email', decryptedData.email, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        if (decryptedData.password) {
          setValue('password', decryptedData.password, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        setRememberCheck(true);
      }
    }
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
                    id="email"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
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

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberCheck}
                  onClick={handleRememberCheck}
                />
              }
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  <Typography variant="body2">Don't have an account? Sign Up</Typography>
                </Link>
                {/* <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
            <CopyRight sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
