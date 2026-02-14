import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AcquisitionForm } from './components/AcquisitionForm';
import { ReviewAcquisition } from './components/ReviewAcquisition';
import { SuccessPage } from './components/SuccessPage';
import { AcquisitionsList } from './components/AcquisitionsList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<AcquisitionForm />} />
        <Route path="/review" element={<ReviewAcquisition />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/acquisitions" element={<AcquisitionsList />} />
        <Route path="/" element={<Navigate to="/form" replace />} />
        <Route path="*" element={<Navigate to="/form" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
