import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "centered"
declare module "../../node_modules/.pnpm/nuxt@3.13.1_@biomejs+biome@1.8.3_@parcel+watcher@2.4.1_@types+node@22.5.4_ioredis@5.4.1_magic_2qh32ke6w6ddjh3wveup27dtjm/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}