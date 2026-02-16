import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onUnspscChange: (index: number, value: string) => void;
    onAddUnspsc: () => void;
    onRemoveUnspsc: (index: number) => void;
}

const UnspscCodes = ({ form, onUnspscChange, onAddUnspsc, onRemoveUnspsc }: Props) => {
    return (
        <fieldset>
            <legend>Códigos UNSPSC</legend>

            <div className="unspsc-container">
                {form.unspscCodes.map((code, index) => (
                    <div key={index} className="unspsc-field">
                        <input
                            type="number"
                            value={code.code}
                            onChange={(e) => onUnspscChange(index, e.target.value)}
                            placeholder={`Código UNSPSC ${index + 1}`}
                        />
                        {form.unspscCodes.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onRemoveUnspsc(index)}
                                className="remove-btn"
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button type="button" onClick={onAddUnspsc} className="add-btn">
                + Agregar Código UNSPSC
            </button>
        </fieldset>
    );
};

export default UnspscCodes;
