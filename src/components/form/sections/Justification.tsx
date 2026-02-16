import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Justification = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Justificación</legend>

            <div className="form-group">
                <label htmlFor="justificacionNecesidad">Justificación de la Necesidad *</label>
                <textarea
                    id="justificacionNecesidad"
                    name="justificacionNecesidad"
                    value={form.justificacionNecesidad}
                    onChange={onChange}
                    required
                    placeholder="Explique detalladamente la justificación de esta adquisición"
                    rows={4}
                />
            </div>
        </fieldset>
    );
};

export default Justification;
