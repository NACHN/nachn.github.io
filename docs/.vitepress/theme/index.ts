// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import type { Component } from 'vue'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import './custom.css'
import { useData } from 'vitepress'

// ---------------------------------------------------------------------------
// Auto-discover all .vue components from theme directories
// ---------------------------------------------------------------------------
const modules = import.meta.glob<{ default: Component }>(
  ['./**/*.vue', '!./NotFound.vue'],
  { eager: true }
)

/** kebab-case / PascalCase / lowercase → PascalCase */
function toPascalCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c: string) => c.toUpperCase())
    .replace(/^./, (s) => s.toUpperCase())
}

const nameOverrides: Record<string, string> = {
  LaTeXPG: 'LatexPG',           // custom casing
  AircraftViewer: 'ACViewer',   // export-name ≠ filename
}

function componentName(filePath: string): string {
  const base = filePath.split('/').pop()!.replace(/\.vue$/, '')
  if (nameOverrides[base]) return nameOverrides[base]
  return toPascalCase(base)
}

// { componentName → SFC }
const components: Record<string, Component> = {}
for (const [path, mod] of Object.entries(modules)) {
  const name = componentName(path)
  // skip names that aren't valid custom-element identifiers (e.g. "1")
  if (/^\d/.test(name)) continue
  components[name] = mod.default
}

// Destructure components used in the Layout render function
const { IconsBg, MeteorBg, BackToTop, HeroBP, Comment } = components

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------
export default {
  ...DefaultTheme,

  NotFound, // VitePress's special slot — not auto-registered

  Layout: () => {
    const { frontmatter } = useData()
    const slots = {
      'layout-bottom': () => {
        if (frontmatter.value.hasBg) {
          return h('div', [h(IconsBg), h(MeteorBg), h(BackToTop)])
        }
        return h(BackToTop)
      },
      'home-hero-image': () => h(HeroBP),
      'doc-after': () => (frontmatter.value.comments ? h(Comment) : null),
    }

    return h(DefaultTheme.Layout, null, slots)
  },

  enhanceApp({ app }) {
    for (const [name, comp] of Object.entries(components)) {
      app.component(name, comp)
    }
  },
} satisfies Theme
