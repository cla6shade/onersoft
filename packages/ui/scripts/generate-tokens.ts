/* CLI entry for `pnpm gen:token` — writes src/styles/tokens.css from the
 * token tree. The vite plugin keeps the file fresh during build/watch; this
 * exists for tasks that need the file without running a build (e.g. lint on
 * a fresh checkout). */
import { writeTokensCss } from './tokens-codegen';

writeTokensCss();
