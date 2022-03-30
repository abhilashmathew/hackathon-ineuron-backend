export interface ResFailedInterface {
  status: 'ERROR';
  error: {
    message: string;
    devMessage?: string;
    code: number;
    routeInfo?: Record<string, unknown>;
    errorStack?: unknown;
  };
}
