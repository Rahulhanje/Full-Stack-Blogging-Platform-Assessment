import { clearAuthCookie } from '../../../../lib/auth';

export async function POST() {
  try {
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