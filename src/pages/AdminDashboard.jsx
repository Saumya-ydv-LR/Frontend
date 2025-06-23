
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button'; // Adjusted path
import { PlusCircle, Edit3, Trash2, LogOut, Settings, Users, BarChart2 } from 'lucide-react'; // Added icons

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logic to clear session/token if stored client-side (e.g. localStorage)
    // If using HttpOnly cookies, backend should handle session termination on logout endpoint
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Example to clear cookie
    alert("Logged out successfully."); // Replace with toast
    navigate('/login');
  };

  const dashboardItems = [
    { title: "Add Product", description: "Add new delicious items to your catalog.", icon: PlusCircle, action: () => console.log("Add Product clicked") },
    { title: "Manage Products", description: "Edit, update, or remove existing products.", icon: Edit3, action: () => console.log("Manage Products clicked") },
    { title: "View Orders", description: "Track and manage customer orders.", icon: BarChart2, action: () => console.log("View Orders clicked") },
    { title: "Manage Users", description: "View and manage user accounts.", icon: Users, action: () => console.log("Manage Users clicked") },
    { title: "Site Settings", description: "Configure general website settings.", icon: Settings, action: () => console.log("Site Settings clicked") },
  ];

  return (
    <div className="min-h-screen bg-red-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-red-200">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-red-700 mb-4 sm:mb-0">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map(item => (
            <div key={item.title} className="bg-red-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center text-red-700 mb-3">
                  <item.icon className="w-7 h-7 mr-3" />
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                </div>
                <p className="text-neutral-700 text-sm mb-4">{item.description}</p>
              </div>
              <Button 
                onClick={item.action}
                className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Go to {item.title.split(' ')[0]}
              </Button>
            </div>
          ))}
           <div className="bg-red-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center text-red-700 mb-3">
                  <Trash2 className="w-7 h-7 mr-3" />
                  <h2 className="text-xl font-semibold">System Maintenance</h2>
                </div>
                <p className="text-neutral-700 text-sm mb-4">Perform system checks and cleanup.</p>
              </div>
              <Button 
                variant="outline"
                className="mt-auto w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md"
              >
                Run Diagnostics
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
