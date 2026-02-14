import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcquisitionData } from '../types';
import { acquisitionService } from '../services/api';
import '../styles/AcquisitionsList.css';

export const AcquisitionsList: React.FC = () => {
  const navigate = useNavigate();
  const [acquisitions, setAcquisitions] = useState<AcquisitionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAcquisitions = async () => {
      try {
        const data = await acquisitionService.getAcquisitions();
        setAcquisitions(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    loadAcquisitions();
  }, []);

  const handleViewDetails = (id?: string) => {
    if (id) {
      navigate(`/review`, { state: { acquisitionId: id } });
    }
  };

  const handleNewAcquisition = () => {
    navigate('/form');
  };

  if (loading) {
    return <div className="loading">Cargando solicitudes...</div>;
  }

  return (
    <div className="acquisitions-list-container">
      <div className="list-header">
        <div className="header-title">
          <h1>Mis Solicitudes de Adquisición</h1>
        </div>
        <div className="header-actions">
          <button onClick={handleNewAcquisition} className="new-btn">
            + Nueva Solicitud
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {acquisitions.length === 0 ? (
        <div className="no-acquisitions">
          <p>No tiene solicitudes registradas aún.</p>
          <button onClick={handleNewAcquisition} className="new-btn">
            Crear Primera Solicitud
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="acquisitions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rubro</th>
                <th>Despacho</th>
                <th>Valor Solicitado</th>
                <th>Valor Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {acquisitions.map((acq) => (
                <tr key={acq.id}>
                  <td>{acq.id}</td>
                  <td>{acq.rubro}</td>
                  <td>{acq.despacho}</td>
                  <td>
                    {acq.valorSolicitado.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </td>
                  <td>
                    {((acq.valorSolicitado || 0) + (acq.valorVigenciaFutura || 0)).toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </td>
                  <td>
                    <button onClick={() => handleViewDetails(acq.id)} className="view-btn">
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
