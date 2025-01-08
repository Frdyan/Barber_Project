import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import Services from './pages/ServicesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/booking' element={<BookingPage />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/services' element={<Services />} />
  </Route >
  )
);

const App = () => {
  return <RouterProvider router={router} />
};

export default App
