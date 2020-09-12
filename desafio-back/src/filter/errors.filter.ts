import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();
        let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            console.error(error);
            return response.status(status).json({
                statusCode: status,
                message: this.getErrorMessage(error)
            });
        } else {
            return response.status(status).json(error.response);
        }
    }

    getErrorMessage(error: any) {
        switch (error.code) {
            case 11000:
                return `Chave duplicada: Já existe um registro cadastrado com a chave ${Object.keys(error.keyValue)[0]} igual a ${error.keyValue[Object.keys(error.keyValue)[0]]}`;
            default:
                return 'Ocorreu um erro interno';
        }
    }
}