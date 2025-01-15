import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <div className="lg:ml-64"> {/* Wrapper for content area */}
            <Header />
            <main className="p-8">
              <Outlet />
            </main>
          </div>
        </div>
    );
}

export default DashboardLayout