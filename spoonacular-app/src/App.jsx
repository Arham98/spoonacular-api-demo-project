import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/utilities/NavBar';
import NotFound from './components/pages/NotFound';
import CustomFooter from './components/utilities/CustomFooter';
import RecipePage from './components/pages/RecipePage';
import ProductPage from './components/pages/ProductPage';

function App() {
  const apiKey = '092e01dfab4e42f08059e2c461a43657';

  return (
    <>
      <NavBar />
      <div className="d-flex flex-column" style={{ minHeight: '80vh', background: '#313131', paddingTop: '10vh' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes/633790" />} />
            <Route path="recipes/:recipeId" element={<RecipePage apiKey={apiKey} />} />
            <Route path="ingredients/:ingredientId" element={<RecipePage apiKey={apiKey} />} />
            <Route path="products/:productId" element={<ProductPage apiKey={apiKey} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <CustomFooter />
    </>
  );
}

export default App;
