import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AcquisitionData } from '../types';
import { acquisitionService } from '../services/api';
import '../styles/ReviewAcquisition.css';

export const ReviewAcquisition: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<AcquisitionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const acquisitionId = (location.state as any)?.acquisitionId;
        if (!acquisitionId) {
          setError('No se encontró el ID de la solicitud');
          return;
        }

        const acquisitionData = await acquisitionService.getAcquisitionById(acquisitionId);
        setData(acquisitionData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location.state]);

  const handleConfirm = async () => {
    if (!data?.id) return;

    setConfirming(true);
    try {
      await acquisitionService.confirmAcquisition(data.id);
      navigate('/success', { state: { acquisitionId: data.id } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al confirmar la solicitud');
    } finally {
      setConfirming(false);
    }
  };

  const handleEdit = () => {
    navigate('/form', { state: { acquisitionId: data?.id } });
  };

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  if (!data) {
    return <div className="error-message">{error || 'No se encontraron datos'}</div>;
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h1>Revisión de Solicitud de Adquisición</h1>
        <p>Por favor revise la información antes de confirmar</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="review-content">
        {/* Sección 1: Información Básica */}
        <section className="review-section">
          <h2>Información Básica</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Rubro</label>
              <p>{data.rubro}</p>
            </div>
            <div className="info-item">
              <label>Nivel Subordinal de Rubro</label>
              <p>{data.nivelSubordinaRubro}</p>
            </div>
            <div className="info-item">
              <label>Nombre del Rubro a Nivel Subordinal</label>
              <p>{data.nombreRubroNivel}</p>
            </div>
            <div className="info-item">
              <label>Despacho</label>
              <p>{data.despacho}</p>
            </div>
            <div className="info-item">
              <label>Dependencia</label>
              <p>{data.dependencia}</p>
            </div>
            <div className="info-item">
              <label>Grupo</label>
              <p>{data.grupo}</p>
            </div>
          </div>
        </section>

        {/* Sección 2: Objeto del Contrato */}
        <section className="review-section">
          <h2>Objeto del Contrato</h2>
          <div className="info-full">
            <label>Objeto de Contrato</label>
            <p>{data.objetoContrato}</p>
          </div>
        </section>

        {/* Sección 3: Códigos UNSPSC */}
        <section className="review-section">
          <h2>Códigos UNSPSC</h2>
          <div className="unspsc-list">
            {data.unspscCodes && data.unspscCodes.length > 0 ? (
              <ul>
                {data.unspscCodes.map((code, index) => (
                  <li key={index}>
                    Código {index + 1}: <strong>{code.code}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se han agregado códigos UNSPSC</p>
            )}
          </div>
        </section>

        {/* Sección 4: Fechas */}
        <section className="review-section">
          <h2>Fechas</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Fecha de Radicación de Estudios Previos</label>
              <p>{new Date(data.fechaRadicacionEstudiosPrevios).toLocaleDateString('es-CO')}</p>
            </div>
            <div className="info-item">
              <label>Fecha Estimada de Inicio de Contrato</label>
              <p>{new Date(data.fechaEstimadaInicio).toLocaleDateString('es-CO')}</p>
            </div>
            <div className="info-item">
              <label>Fecha Planeada de Fin del Contrato</label>
              <p>{new Date(data.fechaPlanadadFin).toLocaleDateString('es-CO')}</p>
            </div>
            <div className="info-item">
              <label>Duración del Contrato</label>
              <p>{data.duracionContrato}</p>
            </div>
          </div>
        </section>

        {/* Sección 5: Modalidad y Ubicación */}
        <section className="review-section">
          <h2>Modalidad y Ubicación</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Modalidad</label>
              <p>{data.modalidad}</p>
            </div>
            <div className="info-item">
              <label>Ciudad de Origen</label>
              <p>{data.ciudadOrigen}</p>
            </div>
            <div className="info-item">
              <label>¿Requiere Vigencia Futura?</label>
              <p>{data.requiereVigenciaFutura === 'SI' ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </section>

        {/* Sección 6: Información del Supervisor */}
        <section className="review-section">
          <h2>Información del Supervisor</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Supervisor</label>
              <p>{data.supervisor}</p>
            </div>
            <div className="info-item">
              <label>Teléfono</label>
              <p>{data.telefono}</p>
            </div>
            <div className="info-item">
              <label>Correo del Supervisor</label>
              <p>{data.correoSupervisor}</p>
            </div>
            <div className="info-item">
              <label>Cargo del Supervisor</label>
              <p>{data.cargoSupervisor}</p>
            </div>
          </div>
        </section>

        {/* Sección 7: Justificación */}
        <section className="review-section">
          <h2>Justificación</h2>
          <div className="info-full">
            <label>Justificación de la Necesidad</label>
            <p>{data.justificacionNecesidad}</p>
          </div>
        </section>

        {/* Sección 8: Información del Recurso */}
        <section className="review-section">
          <h2>Información del Recurso</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Tipo de Recurso</label>
              <p>{data.tipoRecurso}</p>
            </div>
            <div className="info-item">
              <label>¿Es Recurrente?</label>
              <p>{data.recurrente === 'SI' ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </section>

        {/* Sección 9: Valores */}
        <section className="review-section">
          <h2>Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <label>Valor Solicitado</label>
              <p className="value">
                {data.valorSolicitado.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                })}
              </p>
            </div>
            <div className="value-item">
              <label>Valor Vigencia Futura</label>
              <p className="value">
                {data.valorVigenciaFutura.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                })}
              </p>
            </div>
            <div className="value-item highlight">
              <label>Valor Total</label>
              <p className="value total">
                {((data.valorSolicitado || 0) + (data.valorVigenciaFutura || 0)).toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                })}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Botones de acción */}
      <div className="review-actions">
        <button onClick={handleEdit} className="edit-btn" disabled={confirming}>
          Editar Información
        </button>
        <button onClick={handleConfirm} className="confirm-btn" disabled={confirming}>
          {confirming ? 'Confirmando...' : 'Confirmar y Enviar'}
        </button>
      </div>
    </div>
  );
};
