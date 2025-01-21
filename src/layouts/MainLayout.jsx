import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    
    if (token && savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Redirect admin ke dashboard jika mencoba mengakses halaman user
      if (userData.role_id === 1 && location.pathname === '/') {
        navigate('/dashboard');
        return;
      }
    }
    setIsLoading(false);
  }, [navigate, location]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    
    // Redirect berdasarkan role setelah login
    if (userData.role_id === 1) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div>
      <NavBar user={user} onLogout={handleLogout} />
      <Outlet context={{ user, handleLoginSuccess }} />
    </div>
  );
};

export default MainLayout;