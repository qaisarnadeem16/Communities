import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Communities, Reports, Users } from './Routes/Route'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/Admin/AdminLogin';
import Store from './Redux/store'
import { useEffect } from 'react';
import { loadUser } from './Redux/Action/User';
// import ProtectedRoute from './Routes/ProtectedRoute';
import AdminProtectedRoute from './Routes/AdminProtectedRoute'
import { loadAdmin } from './Redux/Action/Admin';
import SignupUserForm from './components/SignupUserForm';
// import ReportAddForm from './components/ReportAddForm';
// import DashBoard from './pages/Admin/DashBoard';
// import { useSelector } from 'react-redux';



function App() {
  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(loadAdmin())
  })
  // const { vendor } = useSelector((state) => state.vendor);
  // console.log(vendor)
  return (
    <>

      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/user" element={<SignupUserForm />} />
          {/* <Route path="/report" element={<ReportAddForm />} /> */}


          <Route path="/dashboard" element={
            <AdminProtectedRoute>
              <Reports />
            </AdminProtectedRoute>
          } />

          <Route path="/dashboard/users" element={
            <AdminProtectedRoute>
              <Users />
            </AdminProtectedRoute>
          } />

          
          <Route path="/dashboard/Communities" element={
            <AdminProtectedRoute>
              <Communities />
            </AdminProtectedRoute>
          } />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
