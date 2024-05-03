import Redis from "ioredis";
import { config } from "dotenv";

export const handler = async (event) => {
  config();

  const client = new Redis(process.env.REDIS_REAL_TIME_CONNECTIONS);

  if (event.requestContext.routeKey === "$connect") {
    await client.set(event.requestContext.connectionId, "true");
  }

  if (event.requestContext.routeKey === "$disconnect") {
    await client.del(event.requestContext.connectionId);
  }

  const response = {
    statusCode: 200,
  };
  return response;
};
