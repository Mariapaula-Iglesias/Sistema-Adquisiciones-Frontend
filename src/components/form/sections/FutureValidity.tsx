import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const FutureValidity = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Vigencia Futura</legend>

            <div className="form-group">
                <label htmlFor="requiereVigenciaFutura">¿Requiere Vigencia Futura? *</label>
                <select
                    id="requiereVigenciaFutura"
                    name="requiereVigenciaFutura"
                    value={form.requiereVigenciaFutura}
                    onChange={onChange}
                >
                    <option value="NO">No</option>
                    <option value="SI">Sí</option>
                </select>
            </div>
        </fieldset>
    );
};

export default FutureValidity;
