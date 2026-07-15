/* TypeScript source of truth for the design-token system. The stylesheet
 * (src/styles/tokens.css) is generated from this tree at build time. */

export * from './expressions';
export * from './knobs';
export * from './palette';
export * from './colors';
export { staticSections, focusDecls, shadowDecls, type StaticSection } from './statics';
export { mediaOverrides, type MediaOverride } from './media';
export { buildTokensCss } from './emit';
export {
  tokenSet,
  tokenCatalog,
  derivationTrees,
  groupOf,
  type FlatToken,
  type FlatTokenSet,
  type TokenFamilyName,
  type CatalogRow,
  type TreeNode,
  type TreeGroup,
} from './meta';
