import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Landing from './pages/Landing';
import RegisterForm from './pages/Auth/RegisterForm';
import LoginForm from './pages/Auth/LoginForm';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Landing />} />
          <Route path="/todos" element={<h1>Todolist Page</h1>} />
          <Route path="/categories" element={<h1>Categories Page</h1>} />
          <Route path="/users" element={<h1>Peoples Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;