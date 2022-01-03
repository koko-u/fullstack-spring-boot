import { ParamLike } from '../../services/query-param.service'

export class QueryParam implements ParamLike {
  page?: number
  size?: number
  sort?: string

  get keys(): string[] {
    return ['page', 'size', 'sort']
  }

  has(key: string): boolean {
    switch (key) {
      case 'page':
        return !!this.page
      case 'size':
        return !!this.size
      case 'sort':
        return !!this.sort
      default:
        return false
    }
  }

  get(key: string): string | null {
    switch (key) {
      case 'page':
        return this.page ? `${this.page}` : null
      case 'size':
        return this.size ? `${this.size}` : null
      case 'sort':
        return this.sort ?? null
      default:
        return null
    }
  }
}
