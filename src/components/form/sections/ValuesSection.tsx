import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    calculateTotal: () => number;
}

const ValuesSection = ({ form, onChange, calculateTotal }: Props) => {
    return (
        <fieldset>
            <legend>Valores</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="valorSolicitado">Valor Solicitado (COP) *</label>
                    <input
                        id="valorSolicitado"
                        type="number"
                        name="valorSolicitado"
                        value={form.valorSolicitado}
                        onChange={onChange}
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
                        value={form.valorVigenciaFutura}
                        onChange={onChange}
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
    );
};

export default ValuesSection;
