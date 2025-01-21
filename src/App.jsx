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

//dashboardPages
import BarberManagementPage from './pages/Dashboard/BarberManagementPage'
import BookingManagementPage from './pages/Dashboard/BookingManagementPage'
import UserManagementPage from './pages/Dashboard/UserManagementPage'
import ProtectedRoute from './components/ProtectedRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/booking' element={<BookingPage />} />
  </Route>

  <Route path="/dashboard" element={<ProtectedRoute />}>
      <Route index element={<BarberManagementPage />} /> 
      <Route path="bookings" element={<BookingManagementPage />} />
      <Route path="users" element={<UserManagementPage />} />
  </Route>
  </>
  )
);

const App = () => {
  return <RouterProvider router={router} />
};

export default App
