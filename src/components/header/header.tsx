import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import avatar from '../../images/user.png';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { editArticle, oauth } from '../../redux/reducersSlice/createSlice';

const Header = () => {
  const tokenLocal = localStorage.getItem('token');
  const user = localStorage.getItem('username');
  const image = localStorage.getItem('image');
  const { status, username } = useAppSelector((state) => state.articles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenLocal) {
      dispatch(oauth(true));
    }
  });
  const remove = () => {
    localStorage.clear();
    dispatch(oauth(false));
  };
  return (
    <>
      {!status ? (
        <div className={styles.container}>
          <Link to="/articles" className={styles.text}>
            Realworld Blog
          </Link>
          <Link to="sign-in" className={styles.singIn}>
            Sign In
          </Link>
          <Link to="sign-up" className={styles.singUp}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <Link to="/articles" className={styles.text}>
            <button
              type="button"
              aria-label="edit"
              onClick={() => dispatch(editArticle(false))}
              className={styles.text}
            >
              Realworld Blog
            </button>
          </Link>
          <Link to="/new-article" className={styles.createArticleButton}>
            Create article
          </Link>
          <Link to="/profile" className={styles.usernameText}>
            <p>{username || user}</p>
          </Link>
          <Link to="/profile">
            <img src={image || avatar} alt="useImg" className={styles.userImg} />
          </Link>
          <Link to="/">
            <button
              className={styles.logOut}
              onClick={() => {
                navigate('/');
                remove();
              }}
            >
              Log Out
            </button>
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { Header };
