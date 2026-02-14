import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcquisitionData } from '../types';
import { acquisitionService } from '../services/api';
import '../styles/AcquisitionForm.css';

export const AcquisitionForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<AcquisitionData>({
    rubro: '',
    nivelSubordinaRubro: '',
    nombreRubroNivel: '',
    despacho: '',
    dependencia: '',
    grupo: '',
    objetoContrato: '',
    unspscCodes: [{ code: '' }],
    fechaRadicacionEstudiosPrevios: '',
    fechaEstimadaInicio: '',
    fechaPlanadadFin: '',
    duracionContrato: '',
    modalidad: '',
    ciudadOrigen: '',
    requiereVigenciaFutura: 'NO',
    telefono: '',
    justificacionNecesidad: '',
    supervisor: '',
    correoSupervisor: '',
    cargoSupervisor: '',
    tipoRecurso: 0,
    recurrente: 'NO',
    valorSolicitado: 0,
    valorVigenciaFutura: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tipoRecurso' ? parseInt(value) : name === 'valorSolicitado' || name === 'valorVigenciaFutura' ? parseFloat(value) : value,
    }));
  };

  const handleUnspscChange = (index: number, value: string) => {
    const newCodes = [...formData.unspscCodes];
    newCodes[index].code = value;
    setFormData((prev) => ({
      ...prev,
      unspscCodes: newCodes,
    }));
  };

  const addUnspscField = () => {
    setFormData((prev) => ({
      ...prev,
      unspscCodes: [...prev.unspscCodes, { code: '' }],
    }));
  };

  const removeUnspscField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      unspscCodes: prev.unspscCodes.filter((_, i) => i !== index),
    }));
  };

  const calculateTotal = () => {
    return formData.valorSolicitado + formData.valorVigenciaFutura;
  };

  const handleSaveDraft = async () => {
    setError('');
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        valorTotal: calculateTotal(),
      };
      const savedData = await acquisitionService.saveAcquisition(dataToSave);
      navigate('/review', { state: { acquisitionId: savedData.id } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Formulario de Adquisición</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="acquisition-form">
        {/* Sección 1: Información Básica */}
        <fieldset>
          <legend>Información Básica</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rubro">Rubro *</label>
              <input
                id="rubro"
                type="text"
                name="rubro"
                value={formData.rubro}
                onChange={handleInputChange}
                required
                placeholder="Ej: 1-001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nivelSubordinaRubro">Nivel Subordinal de Rubro *</label>
              <input
                id="nivelSubordinaRubro"
                type="text"
                name="nivelSubordinaRubro"
                value={formData.nivelSubordinaRubro}
                onChange={handleInputChange}
                required
                placeholder="Ej: 1-001-001"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombreRubroNivel">Nombre del Rubro a Nivel Subordinal *</label>
              <input
                id="nombreRubroNivel"
                type="text"
                name="nombreRubroNivel"
                value={formData.nombreRubroNivel}
                onChange={handleInputChange}
                required
                placeholder="Nombre descriptivo"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="despacho">Despacho *</label>
              <input
                id="despacho"
                type="text"
                name="despacho"
                value={formData.despacho}
                onChange={handleInputChange}
                required
                placeholder="Nombre del despacho"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dependencia">Dependencia *</label>
              <input
                id="dependencia"
                type="text"
                name="dependencia"
                value={formData.dependencia}
                onChange={handleInputChange}
                required
                placeholder="Nombre de la dependencia"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grupo">Grupo *</label>
              <input
                id="grupo"
                type="text"
                name="grupo"
                value={formData.grupo}
                onChange={handleInputChange}
                required
                placeholder="Nombre del grupo"
              />
            </div>
          </div>
        </fieldset>

        {/* Sección 2: Objeto del Contrato */}
        <fieldset>
          <legend>Objeto del Contrato</legend>

          <div className="form-group">
            <label htmlFor="objetoContrato">Objeto de Contrato *</label>
            <textarea
              id="objetoContrato"
              name="objetoContrato"
              value={formData.objetoContrato}
              onChange={handleInputChange}
              required
              placeholder="Describa detalladamente el objeto del contrato"
              rows={4}
            />
          </div>
        </fieldset>

        {/* Sección 3: Códigos UNSPSC */}
        <fieldset>
          <legend>Códigos UNSPSC</legend>

          <div className="unspsc-container">
            {formData.unspscCodes.map((code, index) => (
              <div key={index} className="unspsc-field">
                <input
                  type="number"
                  value={code.code}
                  onChange={(e) => handleUnspscChange(index, e.target.value)}
                  placeholder={`Código UNSPSC ${index + 1}`}
                />
                {formData.unspscCodes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUnspscField(index)}
                    className="remove-btn"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" onClick={addUnspscField} className="add-btn">
            + Agregar Código UNSPSC
          </button>
        </fieldset>

        {/* Sección 4: Fechas */}
        <fieldset>
          <legend>Fechas</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaRadicacionEstudiosPrevios">Fecha de Radicación de Estudios Previos *</label>
              <input
                id="fechaRadicacionEstudiosPrevios"
                type="date"
                name="fechaRadicacionEstudiosPrevios"
                value={formData.fechaRadicacionEstudiosPrevios}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaEstimadaInicio">Fecha Estimada de Inicio de Contrato *</label>
              <input
                id="fechaEstimadaInicio"
                type="date"
                name="fechaEstimadaInicio"
                value={formData.fechaEstimadaInicio}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaPlanadadFin">Fecha Planeada de Fin del Contrato *</label>
              <input
                id="fechaPlanadadFin"
                type="date"
                name="fechaPlanadadFin"
                value={formData.fechaPlanadadFin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duracionContrato">Duración del Contrato *</label>
              <input
                id="duracionContrato"
                type="text"
                name="duracionContrato"
                value={formData.duracionContrato}
                onChange={handleInputChange}
                required
                placeholder="Ej: 12 meses"
              />
            </div>
          </div>
        </fieldset>

        {/* Sección 5: Modalidad y Ubicación */}
        <fieldset>
          <legend>Modalidad y Ubicación</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modalidad">Modalidad *</label>
              <input
                id="modalidad"
                type="text"
                name="modalidad"
                value={formData.modalidad}
                onChange={handleInputChange}
                required
                placeholder="Ej: Directa, Abierta, Restringida"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ciudadOrigen">Ciudad de Origen *</label>
              <input
                id="ciudadOrigen"
                type="text"
                name="ciudadOrigen"
                value={formData.ciudadOrigen}
                onChange={handleInputChange}
                required
                placeholder="Nombre de la ciudad"
              />
            </div>
          </div>
        </fieldset>

        {/* Sección 6: Vigencia Futura */}
        <fieldset>
          <legend>Vigencia Futura</legend>

          <div className="form-group">
            <label htmlFor="requiereVigenciaFutura">¿Requiere Vigencia Futura? *</label>
            <select
              id="requiereVigenciaFutura"
              name="requiereVigenciaFutura"
              value={formData.requiereVigenciaFutura}
              onChange={handleInputChange}
            >
              <option value="NO">No</option>
              <option value="SI">Sí</option>
            </select>
          </div>
        </fieldset>

        {/* Sección 7: Supervisor */}
        <fieldset>
          <legend>Información del Supervisor</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="supervisor">Supervisor *</label>
              <input
                id="supervisor"
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleInputChange}
                required
                placeholder="Nombre del supervisor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                placeholder="Número de teléfono"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="correoSupervisor">Correo del Supervisor *</label>
              <input
                id="correoSupervisor"
                type="email"
                name="correoSupervisor"
                value={formData.correoSupervisor}
                onChange={handleInputChange}
                required
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cargoSupervisor">Cargo del Supervisor *</label>
              <input
                id="cargoSupervisor"
                type="text"
                name="cargoSupervisor"
                value={formData.cargoSupervisor}
                onChange={handleInputChange}
                required
                placeholder="Cargo"
              />
            </div>
          </div>
        </fieldset>

        {/* Sección 8: Justificación */}
        <fieldset>
          <legend>Justificación</legend>

          <div className="form-group">
            <label htmlFor="justificacionNecesidad">Justificación de la Necesidad *</label>
            <textarea
              id="justificacionNecesidad"
              name="justificacionNecesidad"
              value={formData.justificacionNecesidad}
              onChange={handleInputChange}
              required
              placeholder="Explique detalladamente la justificación de esta adquisición"
              rows={4}
            />
          </div>
        </fieldset>

        {/* Sección 9: Recurso */}
        <fieldset>
          <legend>Información del Recurso</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoRecurso">Tipo de Recurso (Número) *</label>
              <input
                id="tipoRecurso"
                type="number"
                name="tipoRecurso"
                value={formData.tipoRecurso}
                onChange={handleInputChange}
                required
                placeholder="1, 2, 3, etc..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="recurrente">¿Es Recurrente? *</label>
              <select
                id="recurrente"
                name="recurrente"
                value={formData.recurrente}
                onChange={handleInputChange}
              >
                <option value="NO">No</option>
                <option value="SI">Sí</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Sección 10: Valores */}
        <fieldset>
          <legend>Valores</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="valorSolicitado">Valor Solicitado (COP) *</label>
              <input
                id="valorSolicitado"
                type="number"
                name="valorSolicitado"
                value={formData.valorSolicitado}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="valorVigenciaFutura">Valor Vigencia Futura (COP) *</label>
              <input
                id="valorVigenciaFutura"
                type="number"
                name="valorVigenciaFutura"
                value={formData.valorVigenciaFutura}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Valor Total (COP)</label>
            <div className="value-total">
              {calculateTotal().toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
              })}
            </div>
          </div>
        </fieldset>

        {/* Botones */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Guardando...' : 'Guardar y Revisar'}
          </button>
        </div>
      </form>
    </div>
  );
};
