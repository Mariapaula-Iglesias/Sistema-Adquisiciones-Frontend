import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const DatesSection = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Fechas</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="fechaRadicacionEstudiosPrevios">Fecha de Radicación de Estudios Previos *</label>
                    <input
                        id="fechaRadicacionEstudiosPrevios"
                        type="date"
                        name="fechaRadicacionEstudiosPrevios"
                        value={form.fechaRadicacionEstudiosPrevios}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fechaEstimadaInicio">Fecha Estimada de Inicio de Contrato *</label>
                    <input
                        id="fechaEstimadaInicio"
                        type="date"
                        name="fechaEstimadaInicio"
                        value={form.fechaEstimadaInicio}
                        onChange={onChange}
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
                        value={form.fechaPlanadadFin}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duracionContrato">Duración del Contrato *</label>
                    <input
                        id="duracionContrato"
                        type="text"
                        name="duracionContrato"
                        value={form.duracionContrato}
                        onChange={onChange}
                        required
                        placeholder="Ej: 12 meses"
                    />
                </div>
            </div>
        </fieldset>
    );
};

export default DatesSection;
