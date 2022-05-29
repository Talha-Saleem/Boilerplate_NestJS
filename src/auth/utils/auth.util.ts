import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export async function decodeToken(
  authorization: string
): Promise<DecodedIdToken> {
  const decodedToken: admin.auth.DecodedIdToken = await admin
    .auth()
    .verifyIdToken(authorization);
  return decodedToken;
}
