import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const ContractObject = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Objeto del Contrato</legend>

            <div className="form-group">
                <label htmlFor="objetoContrato">Objeto de Contrato *</label>
                <textarea
                    id="objetoContrato"
                    name="objetoContrato"
                    value={form.objetoContrato}
                    onChange={onChange}
                    required
                    placeholder="Describa detalladamente el objeto del contrato"
                    rows={4}
                />
            </div>
        </fieldset>
    );
};

export default ContractObject;
