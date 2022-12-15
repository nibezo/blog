import { Routes, Route } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { Header } from '../Header/Header';
import { ArticlesSlug } from '../ArticlesSlug/ArticlesSlug';
import { SignUp } from '../SignUp/SignUp';
import { SingIn } from '../SignIn/SignIn';
import { EditProfile } from '../EditProfile/EditProfile';
import { CreateArticle } from '../CreateArticle/CreateArticle';

const App = () => (
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

export default App;
