import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { routes } from '@/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, idx) => (
            <Route 
              key={idx} 
              path={route.path}
              element={route.element}
              index={route.index}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
