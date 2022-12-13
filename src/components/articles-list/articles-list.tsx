import styles from './articles-list.module.scss';
import likes from '../../images/like.png';
import { UserDate } from '../../utils/date-author';
import { Link } from 'react-router-dom';
import { IArticle } from '../../types';
import { useDispatch } from 'react-redux';
import { fetchArticles, fetchDeleteFavorite, fetchPostFavorite } from '../../redux/createAsyncThunk/createAsyncThunk';
import { AppDispatch } from '../../redux/store';

const ArticlesList = ({ body, title, tagList, author, createdAt, favoritesCount, slug }: IArticle) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <li className={styles.container}>
        <div className={styles.header}>
          <Link to={`/articles/${slug}`} className={styles.article}>
            {title}
          </Link>
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
          <span className={styles.title}>{tagList.map((el) => el)}</span>
          <span className={styles.birthday}>{UserDate(createdAt)}</span>
        </div>
        <img src={author.image} alt="user" className={styles.img} />
        <p className={styles.text}>{body}</p>
      </li>
    </>
  );
};

export default ArticlesList;
