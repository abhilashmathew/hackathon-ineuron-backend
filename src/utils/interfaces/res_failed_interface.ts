import HttpException from "../exceptions/http_exception";

interface ResFailedInterface {
  status: "ERROR";
  error: {
    message: string;
    devMessage?:string
    code: number;
    errorStack?: any;
  };
}

export = ResFailedInterface;
