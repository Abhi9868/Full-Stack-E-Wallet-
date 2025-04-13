import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import PrivateRoute from './components/PrivateRoute.jsx';
import Hero from './pages/Hero.jsx';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
