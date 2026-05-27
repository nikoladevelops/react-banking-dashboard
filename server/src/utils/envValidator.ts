/**
 * List of required environment variables.
 * Add any new variables here to enforce they are set.
 */
const REQUIRED_ENV_VARS = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "NODE_ENV",
  "FRONTEND_URL",
] as const;

type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

/**
 * Validates that all required environment variables are present.
 * Exits the process with an error if any are missing.
 */
export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ Missing required environment variables:");
    missing.forEach((v) => console.error(`   - ${v}`));
    console.error("\nPlease check your .env file and try again.\n");
    process.exit(1);
  }

  // Additional validation for JWT_SECRET strength
  const jwtSecret = process.env.JWT_SECRET!;
  if (jwtSecret.length < 32) {
    console.warn(
      "\n⚠️  Warning: JWT_SECRET is less than 32 characters long. For production, use a strong secret (at least 32 chars).\n",
    );
  }

  // Validate PORT is a number
  const port = parseInt(process.env.PORT!, 10);
  if (isNaN(port)) {
    console.error("\n❌ PORT must be a number.\n");
    process.exit(1);
  }

  // Validate NODE_ENV is one of expected values
  const allowedNodeEnv = ["development", "production", "test"];
  if (!allowedNodeEnv.includes(process.env.NODE_ENV!)) {
    console.error(
      `\n❌ NODE_ENV must be one of: ${allowedNodeEnv.join(", ")}\n`,
    );
    process.exit(1);
  }

  console.log("Environment variables validated successfully.");
}
