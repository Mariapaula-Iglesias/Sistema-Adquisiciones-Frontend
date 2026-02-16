import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const ResourceInfo = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Información del Recurso</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="tipoRecurso">Tipo de Recurso (Número) *</label>
                    <input
                        id="tipoRecurso"
                        type="number"
                        name="tipoRecurso"
                        value={form.tipoRecurso}
                        onChange={onChange}
                        required
                        placeholder="1, 2, 3, etc..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recurrente">¿Es Recurrente? *</label>
                    <select
                        id="recurrente"
                        name="recurrente"
                        value={form.recurrente}
                        onChange={onChange}
                    >
                        <option value="NO">No</option>
                        <option value="SI">Sí</option>
                    </select>
                </div>
            </div>
        </fieldset>
    );
};

export default ResourceInfo;
