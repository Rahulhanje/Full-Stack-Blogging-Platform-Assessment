import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../lib/api/root';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req }) => ({
      req, // Pass the request to the context so middleware can access cookies
    }),
  });

export { handler as GET, handler as POST };