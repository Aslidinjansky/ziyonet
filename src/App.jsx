import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MaterialsProvider } from './context/MaterialsContext';
import { LangProvider } from './context/LangContext';
import Header from './components/Header';
import CatalogPage from './components/CatalogPage';
import ChatPage from './components/ChatPage';
import TeacherPage from './components/TeacherPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <MaterialsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
          </Routes>
        </MaterialsProvider>
      </LangProvider>
    </BrowserRouter>
  );
}

export default App;

