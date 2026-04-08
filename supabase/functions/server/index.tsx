import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0df6dd1e/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/make-server-0df6dd1e/contact", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[Contact] Received submission:", JSON.stringify(body));
    
    const id = crypto.randomUUID();
    const key = `contact:${Date.now()}:${id}`;
    
    const contactData = {
      id,
      name: body.name || '',
      email: body.email || '',
      company: body.company || '',
      context: body.context || '',
      stage: body.stage || '',
      support: body.support || [],
      budget: body.budget || '',
      timeline: body.timeline || '',
      submittedAt: new Date().toISOString(),
    };
    
    // Store in KV
    await kv.set(key, contactData);
    console.log("[Contact] Saved with key:", key);
    
    return c.json({ success: true, id, key });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Contact] Error saving contact submission:", errorMessage, error);
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

Deno.serve(app.fetch);