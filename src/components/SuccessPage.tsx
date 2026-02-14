import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SuccessPage.css';

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const acquisitionId = (location.state as any)?.acquisitionId;

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h1>¡Solicitud Confirmada!</h1>
        <p>Su solicitud de adquisición ha sido enviada exitosamente.</p>
        {acquisitionId && (
          <div className="acquisition-id">
            <strong>ID de Solicitud:</strong> {acquisitionId}
          </div>
        )}
        <div className="success-actions">
          <button onClick={() => navigate('/form')} className="new-acquisition-btn">
            Nueva Solicitud
          </button>
          <button onClick={() => navigate('/acquisitions')} className="view-all-btn">
            Ver mis Solicitudes
          </button>
        </div>
      </div>
    </div>
  );
};
