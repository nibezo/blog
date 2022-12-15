/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchArticles, fetchUserUpdate } from '../../redux/createAsyncThunk/createAsyncThunk';
import styles from './EditProfile.module.scss';
import { AppDispatch } from '../../redux/store';

interface IEditProfile {
  username: string;
  email: string;
  password: string | number;
  image: string;
}

const EditProfile = () => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IEditProfile>({ mode: 'onBlur' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.edit}>Edit Profile</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit((el) => {
            localStorage.setItem('username', el.username);
            dispatch(fetchUserUpdate(el)).then(() => dispatch(fetchArticles(1)));
            navigate('/');
            reset();
          })}
        >
          <label>
            <h4 className={styles.username}>Username</h4>
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
              className={styles.formInput}
              placeholder="Username"
            />
            {errors?.username && (
              <p className={styles.errorMessage}>
                {errors?.username?.message || 'Ошибка, Введите правильные значений'}
              </p>
            )}
          </label>
          <label>
            <h4 className={styles.email}>Email address</h4>
            <input
              {...register('email', {
                required: 'Поле обязательно должно быть заполненным',
                pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
              })}
              className={styles.formInput}
              type="email"
              placeholder="email-address"
            />
            {errors?.email && (
              <p className={styles.errorMessage}>{errors?.email?.message || 'Ошибка, Введите правильный email'}</p>
            )}
          </label>
          <label>
            <h4 className={styles.newPassword}>New password</h4>
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
              className={styles.formInput}
              type="password"
              placeholder="New password"
            />
            {errors?.password && (
              <p className={styles.errorMessage}>{errors?.password?.message || 'Ошибка, Введите правильный пароль'}</p>
            )}
          </label>
          <label>
            <h4 className={styles.avatar}>Avatar image (url)</h4>
            <input
              {...register('image', {
                required: 'Поле обязательно должно быть заполненным',
                pattern: {
                  value:
                    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/,
                  message: 'Укажите пожалуйста правильный url',
                },
              })}
              className={styles.formInput}
              placeholder="Avatar image"
            />
            {errors?.image && (
              <p className={styles.errorMessage}>{errors?.image?.message || 'Ошибка, Введите правильный url'}</p>
            )}
          </label>
          <label>
            <input type="submit" className={styles.save} value="Save" disabled={!isValid} />
          </label>
          <input type="submit" className={styles.save} value="Save" disabled={!isValid} />
        </form>
      </div>
    </>
  );
};

export { EditProfile };
