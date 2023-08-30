import { clickPositionStore } from './clickPositionStore'
import { graphStore } from './graphStore'

export function useStore() {
  return {
    graphStore: graphStore(),
    clickPositionStore: clickPositionStore()
  }
}