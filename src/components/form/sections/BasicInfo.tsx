import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const BasicInfo = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Información Básica</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="rubro">Rubro *</label>
                    <input
                        id="rubro"
                        type="text"
                        name="rubro"
                        value={form.rubro}
                        onChange={onChange}
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
                        value={form.nivelSubordinaRubro}
                        onChange={onChange}
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
                        value={form.nombreRubroNivel}
                        onChange={onChange}
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
                        value={form.despacho}
                        onChange={onChange}
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
                        value={form.dependencia}
                        onChange={onChange}
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
                        value={form.grupo}
                        onChange={onChange}
                        required
                        placeholder="Nombre del grupo"
                    />
                </div>
            </div>
        </fieldset>
    );
};

export default BasicInfo;
