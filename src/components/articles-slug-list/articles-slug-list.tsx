import styles from './articles-slug-list.module.scss';
import likes from '../../images/like.png';
import { UserDate } from '../../utils/date-author';
import ReactMarkdown from 'react-markdown';
import { IArticle } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { editArticle } from '../../redux/reducersSlice/createSlice';
import { useDispatch } from 'react-redux';
import {
  fetchArticles,
  fetchDeleteArticle,
  fetchDeleteFavorite,
  fetchPostFavorite,
} from '../../redux/createAsyncThunk/createAsyncThunk';
import { Popconfirm, message } from 'antd';
import { AppDispatch } from '../../redux/store';

const ArticlesSlugList = ({ body, title, tagList, author, createdAt, favoritesCount, slug }: IArticle) => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const confirm = () => {
    dispatch(fetchDeleteArticle(slug)).then(() => fetchArticles(1));
    dispatch(editArticle(false));
    navigate('/');
    message.success('Click on Yes');
  };
  const cancel = () => {
    dispatch(editArticle(false));
    message.error('Click on No');
  };
  return (
    <>
      {username !== author.username ? (
        <li className={styles.container}>
          <div className={styles.header}>
            <span className={styles.article}>{title}</span>
            <button
              className={styles.buttonLike}
              onClick={() => {
                dispatch(fetchPostFavorite(slug)).then(() => dispatch(fetchArticles(1)));
                dispatch(fetchDeleteFavorite(slug)).then(() => dispatch(fetchArticles(1)));
              }}
            >
              <img src={likes} alt="like" className={styles.like} />
            </button>
            <span className={styles.count}>{favoritesCount}</span>
            <span className={styles.author}>{author.username}</span>
          </div>
          <div className={styles.titleDate}>
            <div className={styles.title}>{tagList.map((date: string) => date)}</div>
            <span className={styles.birthday}>{UserDate(createdAt)}</span>
          </div>
          <img src={author.image} alt="user" className={styles.img} />
          <ReactMarkdown className={styles.markdown}>{body}</ReactMarkdown>
        </li>
      ) : (
        <li className={styles.container}>
          <div className={styles.header}>
            <span className={styles.article}>{title}</span>
            <button className={styles.buttonLike}>
              <img src={likes} alt="like" className={styles.like} />
            </button>
            <span className={styles.count}>{favoritesCount}</span>
            <span className={styles.author}>{author.username}</span>
          </div>
          <div className={styles.titleDate}>
            <div className={styles.title}>{tagList.map((date: string) => date)}</div>
            <span className={styles.birthday}>{UserDate(createdAt)}</span>
          </div>
          <img src={author.image} alt="user" className={styles.imgAuthor} />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" aria-label="delete" className={styles.deleteArticle}>
              Delete
            </button>
          </Popconfirm>
          <Link to={`/articles/${slug}/edit`}>
            <button
              type="button"
              aria-label="edit"
              className={styles.editArticle}
              onClick={() => dispatch(editArticle(true))}
            >
              Edit
            </button>
          </Link>
          <ReactMarkdown className={styles.markdown}>{body}</ReactMarkdown>
        </li>
      )}
    </>
  );
};

export default ArticlesSlugList;
