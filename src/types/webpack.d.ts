/**
 * ============================================================================
 * WEBPACK TYPE DECLARATIONS
 * ============================================================================
 *
 * Type declarations for webpack-specific features used in the project.
 * This includes require.context() which is used for dynamic imports.
 */

interface RequireContext {
  keys(): string[]
  <T>(id: string): T
}

declare const require: NodeRequire & {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): RequireContext
}
