/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styles from './SignIn.module.scss';
import { fetchSignIn } from '../../redux/createAsyncThunk/createAsyncThunk';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { AppDispatch } from '../../redux/store';

interface IFormSignIn {
  email: string;
  password: string | number;
}

const SingIn = () => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormSignIn>({ mode: 'onBlur' });
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useAppSelector((state) => state.articles);
  const navigate = useNavigate();
  useEffect(() => {
    if (status) navigate('/');
  });
  // if (error) {
  //   return <div>sadsd</div>;
  // }
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.signIn}>Sign In</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit((el) => {
            dispatch(fetchSignIn(el));
            navigate('/');
            reset();
          })}
        >
          <label className={styles.email}>
            <h4 className={styles.emailText}>Email address:</h4>
            <input
              {...register('email', {
                required: 'Поле обязательно должно быть заполненным',
                pattern: /\S+@\S+\.\S+/,
              })}
              placeholder="Email address"
              type="email"
              className={styles.formInput}
            />
            {errors?.email && (
              <p className={styles.errorMessage}>{errors?.email?.message || 'Ошибка, email неправильный'}</p>
            )}
          </label>
          <label className={styles.password}>
            <h4 className={styles.passwordText}>Password:</h4>
            <input
              placeholder="Password"
              type="password"
              className={styles.formInput}
              {...register('password', {
                required: 'Поле обязательно должно быть заполненным',
              })}
            />
            {errors?.password && <p className={styles.errorMessage}>{errors?.password?.message || 'Ошибка'}</p>}
          </label>
          <label>
            <input type="submit" value="Login" className={styles.login} disabled={!isValid} />
          </label>
        </form>
        <p className={styles.account}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </div>
    </>
  );
};

export { SingIn };
