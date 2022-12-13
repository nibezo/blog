import Articles from '../articles/articles';
import Header from '../header/header';
import ArticlesSlug from '../articles-slug/articles-slug';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../sign-up/sign-up';
import SingIn from '../sign-in/sign-in';
import EditProfile from '../edit-profile/edit-profile';
import CreateArticle from '../create-article/create-article';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Articles />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticlesSlug />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SingIn />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="new-article" element={<CreateArticle />} />
          <Route path="articles/:slug/edit" element={<CreateArticle />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
