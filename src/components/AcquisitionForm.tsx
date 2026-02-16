import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcquisitionData } from '../types';
import { acquisitionService } from '../services/api';
import '../styles/AcquisitionForm.css';

// Import section components
import BasicInfo from './form/sections/BasicInfo';
import ContractObject from './form/sections/ContractObject';
import UnspscCodes from './form/sections/UnspscCodes';
import DatesSection from './form/sections/DatesSection';
import ModalityLocation from './form/sections/ModalityLocation';
import FutureValidity from './form/sections/FutureValidity';
import SupervisorInfo from './form/sections/SupervisorInfo';
import Justification from './form/sections/Justification';
import ResourceInfo from './form/sections/ResourceInfo';
import ValuesSection from './form/sections/ValuesSection';

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
        <BasicInfo form={formData} onChange={handleInputChange} />
        <ContractObject form={formData} onChange={handleInputChange} />
        <UnspscCodes
          form={formData}
          onUnspscChange={handleUnspscChange}
          onAddUnspsc={addUnspscField}
          onRemoveUnspsc={removeUnspscField}
        />
        <DatesSection form={formData} onChange={handleInputChange} />
        <ModalityLocation form={formData} onChange={handleInputChange} />
        <FutureValidity form={formData} onChange={handleInputChange} />
        <SupervisorInfo form={formData} onChange={handleInputChange} />
        <Justification form={formData} onChange={handleInputChange} />
        <ResourceInfo form={formData} onChange={handleInputChange} />
        <ValuesSection form={formData} onChange={handleInputChange} calculateTotal={calculateTotal} />

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
