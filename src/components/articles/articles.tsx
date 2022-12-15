import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { fetchArticles } from '../../redux/createAsyncThunk/createAsyncThunk';
import { ArticlesList } from '../ArticlesList/ArticlesList';
import styles from './Articles.module.scss';
import { IArticle } from '../../types';
import { AppDispatch } from '../../redux/store';

const Articles = () => {
  const { articles, loading } = useAppSelector((state) => state.articles);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchArticles(1));
  }, [dispatch]);
  const result = articles.map((el: IArticle, id: number) => (
    <ArticlesList
      key={id}
      body={el.body}
      title={el.title}
      tagList={el.tagList}
      author={el.author}
      createdAt={el.createdAt}
      favoritesCount={el.favoritesCount}
      slug={el.slug}
    />
  ));
  return (
    <div className={styles.container}>
      {loading && <div className={styles.loader}></div>}
      <ul className={styles.container}>
        {result}
        <Pagination defaultCurrent={1} total={50} onChange={(pages) => dispatch(fetchArticles(pages))} />
      </ul>
    </div>
  );
};

export { Articles };
