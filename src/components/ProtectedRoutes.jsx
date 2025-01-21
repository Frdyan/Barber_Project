import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout';

// components/ProtectedRoute.js
const ProtectedRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
  
      if (!token || !user) {
        navigate('/login');
        return;
      }

      if (user.role_id !== 1) {
        navigate('/');
        return;
      }
    }, [navigate, location]);
  
    return <DashboardLayout />;
  };
  
  export default ProtectedRoute;