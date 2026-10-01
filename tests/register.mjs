import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Test-only transpilation; no generated test code enters the production bundle.
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('.') && context.parentURL) {
      for (const extension of ['.ts', '.tsx']) {
        const url = new URL(specifier + extension, context.parentURL);
        if (existsSync(fileURLToPath(url))) return { url: url.href, shortCircuit: true };
      }
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.endsWith('.css')) return { format: 'module', source: '', shortCircuit: true };
    if (/\.tsx?$/.test(url)) {
      const source = readFileSync(fileURLToPath(url), 'utf8').replaceAll('import.meta.env', '(globalThis.__TEST_ENV__ ?? {})');
      return { format: 'module', shortCircuit: true, source: ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2023 },
      }).outputText };
    }
    return next(url, context);
  },
});
