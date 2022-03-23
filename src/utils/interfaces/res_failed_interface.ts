export interface ResFailedInterface {
  status: "ERROR";
  error: {
    message: string;
    devMessage?:string
    code: number;
    errorStack?: any;
  };
}
