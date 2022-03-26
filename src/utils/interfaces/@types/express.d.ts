import UserPayloadI from '../jwt_user_payload';

declare global {
    namespace Express {
        export interface Request {
            user: UserPayloadI;
        }
    }
}
