import { getCurrentUser } from '../../../../lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return Response.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}