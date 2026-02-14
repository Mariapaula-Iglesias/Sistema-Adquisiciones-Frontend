export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface UnspscCode {
  id?: string;
  code: string;
}

export interface AcquisitionData {
  id?: string;
  rubro: string;
  nivelSubordinaRubro: string;
  nombreRubroNivel: string;
  despacho: string;
  dependencia: string;
  grupo: string;
  objetoContrato: string;
  unspscCodes: UnspscCode[];
  fechaRadicacionEstudiosPrevios: string;
  fechaEstimadaInicio: string;
  fechaPlanadadFin: string;
  duracionContrato: string;
  modalidad: string;
  ciudadOrigen: string;
  requiereVigenciaFutura: 'SI' | 'NO';
  telefono: string;
  justificacionNecesidad: string;
  supervisor: string;
  correoSupervisor: string;
  cargoSupervisor: string;
  tipoRecurso: number;
  recurrente: 'SI' | 'NO';
  valorSolicitado: number;
  valorVigenciaFutura: number;
  valorTotal?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
