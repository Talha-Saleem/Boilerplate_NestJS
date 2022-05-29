import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { decodeToken } from '../utils/auth.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return isAuthenticated(request);
  }
}

export async function isAuthenticated(req) {
  const { authorization } = req.headers;

  if (!authorization) return false;

  if (!authorization?.startsWith('Bearer')) return false;

  const split = authorization.split('Bearer ');

  if (split.length !== 2) return false;

  const token = split[1];

  try {
    const decodedToken = await decodeToken(token);
    if (decodedToken) {
      req.admin = decodedToken.admin;
      return true;
    }

    return false;
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return false;
  }
}
