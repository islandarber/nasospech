import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound } from './views/NotFound';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import NightSky from './components/NightSky';
import { publicRoutes, privateRoutes } from './routes/routes';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth(); // token = admin logged in

  return (
    <div className="bg-cover bg-repeat custom-bg min-h-screen flex flex-col">
      <NightSky />
      <Navbar />
      <main role='main' className="flex-1">
        <Routes>
          {/* Public Routes (always accessible) */}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Private Routes (only accessible when logged in) */}
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={token ? element : <Navigate to="/" />} />
          ))}

          {/* Catch-all for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
