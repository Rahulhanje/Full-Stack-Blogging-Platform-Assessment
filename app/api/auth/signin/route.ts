import { z } from 'zod';
import { db } from '../../../../lib/db';
import { users, sessions } from '../../../../lib/schema';
import { verifyPassword, generateToken } from '../../../../lib/auth';
import { eq } from 'drizzle-orm';

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signinSchema.parse(body);

    // Find user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (userResult.length === 0) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password);
    if (!isValidPassword) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Create session in database
    const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expiresAt = new Date(Date.now() + sessionDuration);

    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
    });

    const response = Response.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

    // Set cookie header
    response.headers.set(
      'Set-Cookie',
      `auth-token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=604800; Path=/`
    );

    return response;
  } catch (error) {
    console.error('Signin error:', error);
    
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}