
      const { defaultExtractor: createDefaultExtractor } = require('tailwindcss/lib/lib/defaultExtractor.js')
      const { customSafelistExtractor, generateSafelist } = require("/home/abhishek/Projects/Web/md-editor/node_modules/.pnpm/@nuxt+ui@2.18.4_magicast@0.3.5_rollup@4.21.3_vite@5.4.4_@types+node@22.5.4_terser@5.32.0__vue@3.5.4_typescript@5.6.2_/node_modules/@nuxt/ui/dist/runtime/utils/colors")

      const defaultExtractor = createDefaultExtractor({ tailwindConfig: { separator: ':' } })

      module.exports = {
        plugins: [
          require('@tailwindcss/forms')({ strategy: 'class' }),
          require('@tailwindcss/aspect-ratio'),
          require('@tailwindcss/typography'),
          require('@tailwindcss/container-queries'),
          require('@headlessui/tailwindcss')
        ],
        content: {
          files: [
            "/home/abhishek/Projects/Web/md-editor/node_modules/.pnpm/@nuxt+ui@2.18.4_magicast@0.3.5_rollup@4.21.3_vite@5.4.4_@types+node@22.5.4_terser@5.32.0__vue@3.5.4_typescript@5.6.2_/node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}",
            "/home/abhishek/Projects/Web/md-editor/node_modules/.pnpm/@nuxt+ui@2.18.4_magicast@0.3.5_rollup@4.21.3_vite@5.4.4_@types+node@22.5.4_terser@5.32.0__vue@3.5.4_typescript@5.6.2_/node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}"
          ],
          transform: {
            vue: (content) => {
              return content.replaceAll(/(?:\r\n|\r|\n)/g, ' ')
            }
          },
          extract: {
            vue: (content) => {
              return [
                ...defaultExtractor(content),
                ...customSafelistExtractor("U", content, ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary"], ["primary"])
              ]
            }
          }
        },
        safelist: generateSafelist(["primary"], ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary"]),
      }
    