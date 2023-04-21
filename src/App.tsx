import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import  AdminRestaurante  from './paginas/Admin/Restaurantes/AdminRestaurante';
import Form from './paginas/Admin/Restaurantes/Form';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurante/>} />
      <Route path="/admin/restaurantes/novo" element={<Form />} />
      <Route path="/admin/restaurantes/:id" element={<Form />} />
    </Routes>
  );
}

export default App;
