import styles from './header.module.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import avatar from '../../images/user.png';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { useEffect } from 'react';
import { oauth } from '../../redux/reducersSlice/createSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const tokenLocal = localStorage.getItem('token');
  const user = localStorage.getItem('username');
  const image = localStorage.getItem('image');
  const { status, username, img } = useAppSelector((state) => state.articles);
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
          <button className={styles.singIn}>
            <Link to="sign-in" className={styles.signInText}>
              Sign In
            </Link>
          </button>
          <button className={styles.singUp}>
            <Link to="sign-up" className={styles.signUpText}>
              Sign Up
            </Link>
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <Link to="/articles" className={styles.text}>
            Realworld Blog
          </Link>
          <button className={styles.createArticleButton}>
            <Link to="/new-article" className={styles.createArticle}>
              Create article
            </Link>
          </button>
          <Link to="/profile">
            <p className={styles.usernameText}>{username || user}</p>
          </Link>
          <Link to="/profile">
            <img src={img ? img || image : avatar} alt="useImg" className={styles.userImg} />
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

export default Header;
