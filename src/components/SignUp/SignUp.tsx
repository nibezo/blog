/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SignUp.module.scss';
import { fetchSignUp } from '../../redux/createAsyncThunk/createAsyncThunk';
import { AppDispatch } from '../../redux/store';

interface IFormSignUp {
  username: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
  agree: boolean;
}

const SignUp = () => {
  const {
    register,
    formState: { errors, isValid },
    reset,
    watch,
    handleSubmit,
  } = useForm<IFormSignUp>({ mode: 'onBlur' });
  const dispatch = useDispatch<AppDispatch>();
  const repeatPassword: any = useRef();
  const navigate = useNavigate();
  repeatPassword.current = watch('password', '');
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.create}>Create new account</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit((el) => {
            dispatch(fetchSignUp(el));
            navigate('/');
            reset();
          })}
        >
          <label className={styles.username}>
            <p className={styles.text}>Username:</p>
            <input
              {...register('username', {
                required: 'Поле обязательно должно быть заполненным',
                minLength: {
                  value: 3,
                  message: 'Имя должен содержать минимум 3 символа',
                },
                maxLength: {
                  value: 21,
                  message: 'Имя не должно превышать более 20 символов',
                },
              })}
              placeholder="Username"
              className={styles.formInput}
            />
            {errors?.username && (
              <p className={styles.errorMessage}>
                {errors?.username?.message || 'Ошибка, Введите правильные значений'}
              </p>
            )}
          </label>
          <label className={styles.email}>
            <p className={styles.text}>Email address:</p>
            <input
              {...register('email', {
                required: 'Поле обязательно должно быть заполненным',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Укажите пожалуйста правильный email',
                },
              })}
              placeholder="Email address"
              type="email"
              className={styles.formInput}
            />
            {errors?.email && (
              <p className={styles.errorMessage}>{errors?.email?.message || 'Ошибка, Введите правильный email'}</p>
            )}
          </label>
          <label className={styles.password}>
            <p className={styles.text}>Password:</p>
            <input
              {...register('password', {
                required: 'Поле обязательно должно быть заполненным',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символа',
                },
                maxLength: {
                  value: 41,
                  message: 'Пароль не должно превышать более 40 символов',
                },
              })}
              placeholder="Password"
              type="password"
              className={styles.formInput}
            />
            {errors?.password && (
              <p className={styles.errorMessage}>{errors?.password?.message || 'Ошибка, Введите правильный пароль'}</p>
            )}
          </label>
          <label className={styles.repeatPassword}>
            <p className={styles.text}>Repeat Password:</p>
            <input
              {...register('confirmPassword', {
                required: 'Поле обязательно должно быть заполненным',
                validate: (val) => val === repeatPassword.current || 'Пароли не совпадают',
              })}
              placeholder="Password"
              type="password"
              className={styles.formInput}
            />
            {errors?.confirmPassword && (
              <p className={styles.errorMessage}>{errors?.confirmPassword?.message || 'Ошибка, Пароли не совпадают'}</p>
            )}
          </label>
          <div className={styles.line}></div>
          <div className={styles.agreement}>
            <label>
              <input
                {...register('agree', {
                  required: true,
                })}
                type="checkbox"
                className={styles.checkbox}
              />
            </label>

            <p className={styles.agree}>I agree to the processing of my personal information</p>
          </div>
          <label>
            <input type="submit" className={styles.createAcount} disabled={!isValid} />
          </label>
        </form>
        <p className={styles.singIn}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </div>
    </>
  );
};

export { SignUp };
