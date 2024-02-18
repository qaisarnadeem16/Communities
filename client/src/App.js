import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Communities, Reports, Users } from './Routes/Route'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './Redux/store'
import AdminProtectedRoute from './Routes/AdminProtectedRoute'
import AdminLogin from './pages/Admin/AdminLogin';
import { useEffect } from 'react';
import { loadAdmin } from './Redux/Action/Admin';
import SignupUserForm from './components/SignupUserForm';
import ReportAddForm from './components/ReportAddForm';



function App() {
  useEffect(() => {
    Store.dispatch(loadAdmin())
  })
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/user" element={<SignupUserForm />} />
            <Route path="/report" element={<ReportAddForm />} />


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
      </CookiesProvider>
    </>
  );
}

export default App;
