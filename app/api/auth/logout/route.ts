import { clearAuthCookie } from '../../../../lib/auth';
import { db } from '../../../../lib/db';
import { sessions } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    // Get the token from cookies to delete from database
    const cookies = request.headers.get('cookie');
    
    if (cookies) {
      const authCookie = cookies
        .split(';')
        .find(c => c.trim().startsWith('auth-token='));
      
      if (authCookie) {
        const token = authCookie.split('=')[1];
        if (token) {
          // Remove session from database
          await db.delete(sessions).where(eq(sessions.token, decodeURIComponent(token)));
        }
      }
    }

    // Clear the auth cookie
    const response = Response.json({ success: true, message: 'Logged out successfully' });
    
    // Clear cookie header
    response.headers.set(
      'Set-Cookie',
      `auth-token=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=0; Path=/`
    );

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}