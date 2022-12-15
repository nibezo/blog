/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCreateArticle, fetchUpdateArticle, fetchArticles } from '../../redux/createAsyncThunk/createAsyncThunk';
import styles from './CreateArticle.module.scss';
import { useAppSelector } from '../../redux/hooks/useTypedSelecor';
import { editArticle } from '../../redux/reducersSlice/createSlice';
import { AppDispatch } from '../../redux/store';

interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

const CreateArticle = () => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateArticle>({ mode: 'onBlur' });
  const [value, setValue] = useState<string>('');
  const [tagList, setTags] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { edit, article } = useAppSelector((state) => state.articles);
  const { slug } = useParams();
  const onSubmit = ({ title, description, body }: { title: string; description: string; body: string }) => {
    if (edit) {
      dispatch(fetchUpdateArticle({ title, description, body, slug })).then(() => dispatch(fetchArticles(1)));
      dispatch(editArticle(false));
    } else {
      dispatch(fetchCreateArticle({ title, description, body, tagList })).then(() => dispatch(fetchArticles(1)));
    }
    navigate('/');
    reset();
  };
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.createArticle}>{edit ? 'Edit Article' : 'Create new article'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.article}>
            <h4 className={styles.textTitle}>Title:</h4>
            <input
              {...register('title', {
                required: 'Поле обязательно должно быть заполненным',
                minLength: {
                  value: 3,
                  message: 'Ваш заголовок должен состоять как минимум из 3 слов',
                },
                maxLength: {
                  value: 70,
                  message: 'Не более 70 символов',
                },
              })}
              defaultValue={edit ? article.map((el) => el.title) : ''}
              placeholder="Title"
              className={styles.formInput}
            />
            {errors?.title && (
              <p className={styles.errorMessage}>{errors?.title?.message || 'Ошибка, Введите правильные значения'}</p>
            )}
          </label>
          <label className={styles.description}>
            <h4 className={styles.textDescription}>Short description:</h4>
            <input
              {...register('description', {
                required: 'Поле обязательно должно быть заполненным',
                minLength: {
                  value: 10,
                  message: 'Ваше описание должен состоять как минимум из 10 слов',
                },
                maxLength: {
                  value: 500,
                  message: 'Не более 500 символов',
                },
              })}
              defaultValue={edit ? article.map((el) => el.description) : ''}
              placeholder="Title"
              className={styles.formInput}
            />
            {errors?.description && (
              <p className={styles.errorMessage}>
                {errors?.description?.message || 'Ошибка, Введите правильные значения'}
              </p>
            )}
          </label>
          <label className={styles.body}>
            <h4 className={styles.bodyTitle}>Text:</h4>
            <textarea
              {...register('body', {
                required: 'Поле обязательно должно быть заполненным',
                minLength: {
                  value: 10,
                  message: 'Ваш текст должен состоять как минимум из 10 слов',
                },
                maxLength: {
                  value: 500,
                  message: 'Не более 500 символов',
                },
              })}
              defaultValue={edit ? article.map((el) => el.body) : ''}
              placeholder="Text"
              className={styles.bodyText}
            />
            {errors?.body && (
              <p className={styles.errorMessage}>{errors?.body?.message || 'Ошибка, Введите правильные значения'}</p>
            )}
          </label>
          <label className={styles.tags}>
            <h4 className={styles.tagsTitle}>Tags:</h4>
            <input
              {...register('tagList', {
                required: false,
              })}
              placeholder="Tag"
              type="text"
              className={styles.tagsInput}
              value={value}
              onChange={(el) => setValue(el.target.value)}
            />
            <button
              type="button"
              aria-label="addArticle"
              className={styles.addTag}
              onClick={() => {
                if (value !== '') {
                  setTags([...tagList, value]);
                  setValue('');
                }
              }}
            >
              Add tag
            </button>
            {edit
              ? article
                  .map((el) => el.tagList)
                  .map((el, id) => (
                    <div key={id}>
                      <label className={styles.tagsContainer}>
                        <input value={el} className={styles.tagsInput} />
                        <button
                          type="button"
                          aria-label="tags"
                          className={styles.addTagsButton}
                          onClick={() => {
                            const result = tagList.filter((_, resId) => resId !== id);
                            setTags(result);
                          }}
                        >
                          Delete
                        </button>
                      </label>
                    </div>
                  ))
              : tagList.map((el, id) => (
                  <div key={id}>
                    <label className={styles.tagsContainer}>
                      <input value={el} className={styles.tagsInput} />
                      <button
                        type="button"
                        aria-label="tags"
                        className={styles.addTagsButton}
                        onClick={() => {
                          const result = tagList.filter((_, resId) => resId !== id);
                          setTags(result);
                        }}
                      >
                        Delete
                      </button>
                    </label>
                  </div>
                ))}
          </label>
          <label>
            <input type="submit" value="Send" className={styles.sendArticle} disabled={!isValid} />
          </label>
        </form>
      </div>
    </>
  );
};

export { CreateArticle };
