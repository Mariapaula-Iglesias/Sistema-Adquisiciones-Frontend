import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ModalityLocation = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Modalidad y Ubicación</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="modalidad">Modalidad *</label>
                    <input
                        id="modalidad"
                        type="text"
                        name="modalidad"
                        value={form.modalidad}
                        onChange={onChange}
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
                        value={form.ciudadOrigen}
                        onChange={onChange}
                        required
                        placeholder="Nombre de la ciudad"
                    />
                </div>
            </div>
        </fieldset>
    );
};

export default ModalityLocation;
