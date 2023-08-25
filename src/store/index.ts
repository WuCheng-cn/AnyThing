import { graphStore } from './graphStore'

export function useStore() {
  return {
    graphStore: graphStore()
  }
}