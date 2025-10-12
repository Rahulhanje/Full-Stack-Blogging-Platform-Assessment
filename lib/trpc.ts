import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { users, sessions } from './schema';
import { eq, and, gt } from 'drizzle-orm';

// Type definitions
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface Context {
  req?: Request;
  user?: User | null;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const COOKIE_NAME = 'auth-token';

// Helper function to get user from request cookies for tRPC
async function getUserFromRequest(req: Request) {
  try {
    const cookies = req.headers.get('cookie');
    if (!cookies) return null;

    const authCookie = cookies
      .split(';')
      .find(c => c.trim().startsWith(`${COOKIE_NAME}=`));
    
    if (!authCookie) return null;

    let token = authCookie.split('=')[1];
    
    // URL decode the token if needed
    if (token) {
      token = decodeURIComponent(token);
    }
    
    if (!token) return null;

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded) return null;

    // Check if session exists in database
    const sessionResult = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.token, token),
          gt(sessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (sessionResult.length === 0) return null;

    // Get user details
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id))
      .limit(1);

    if (userResult.length === 0) return null;

    const user = userResult[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Get user from request failed:', error);
    return null;
  }
}

const t = initTRPC.context<Context>().create();

// Middleware to check authentication
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.req) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Request context missing',
    });
  }

  const user = await getUserFromRequest(ctx.req);
  
  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

// Middleware to optionally check authentication (doesn't throw if not authenticated)
const optionalAuth = t.middleware(async ({ ctx, next }) => {
  if (!ctx.req) {
    return next({
      ctx: {
        ...ctx,
        user: null,
      },
    });
  }

  const user = await getUserFromRequest(ctx.req);
  
  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const optionalAuthProcedure = t.procedure.use(optionalAuth);
export const protectedProcedure = t.procedure.use(isAuthenticated);