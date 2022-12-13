import styles from './articles-slug.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IArticle } from '../../types';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { fetchArticlesSlug } from '../../redux/createAsyncThunk/createAsyncThunk';
import { useDispatch } from 'react-redux';
import ArticlesSlugList from '../articles-slug-list/articles-slug-list';
import { AppDispatch } from '../../redux/store';

const ArticlesSlug = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { article, loading } = useAppSelector((state) => state.articles);
  useEffect(() => {
    dispatch(fetchArticlesSlug(slug));
  }, [dispatch, slug]);
  const articles = article.map((el: IArticle, id: number) => (
    <ArticlesSlugList
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
    <>
      {loading && <div className={styles.loader}></div>}
      <ul>{articles}</ul>
    </>
  );
};

export default ArticlesSlug;
