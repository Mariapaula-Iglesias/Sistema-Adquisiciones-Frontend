import type { AcquisitionData } from '../../../types';

interface Props {
    form: AcquisitionData;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SupervisorInfo = ({ form, onChange }: Props) => {
    return (
        <fieldset>
            <legend>Información del Supervisor</legend>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="supervisor">Supervisor *</label>
                    <input
                        id="supervisor"
                        type="text"
                        name="supervisor"
                        value={form.supervisor}
                        onChange={onChange}
                        required
                        placeholder="Nombre del supervisor"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono *</label>
                    <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={onChange}
                        required
                        placeholder="Número de teléfono"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="correoSupervisor">Correo del Supervisor *</label>
                    <input
                        id="correoSupervisor"
                        type="email"
                        name="correoSupervisor"
                        value={form.correoSupervisor}
                        onChange={onChange}
                        required
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cargoSupervisor">Cargo del Supervisor *</label>
                    <input
                        id="cargoSupervisor"
                        type="text"
                        name="cargoSupervisor"
                        value={form.cargoSupervisor}
                        onChange={onChange}
                        required
                        placeholder="Cargo"
                    />
                </div>
            </div>
        </fieldset>
    );
};

export default SupervisorInfo;
