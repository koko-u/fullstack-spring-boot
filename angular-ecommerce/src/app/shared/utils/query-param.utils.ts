import { ParamLike } from '../../services/query-param.service'

export const pickCategoryId = <T extends ParamLike>(
  paramMap: T
): number | undefined => {
  if (paramMap.has('categoryId')) {
    const categoryId = Number(paramMap.get('categoryId'))
    if (!isNaN(categoryId)) {
      return categoryId
    }
  }
  return undefined
}

export const pickKeyword = <T extends ParamLike>(
  paramMap: T
): string | undefined => {
  if (paramMap.has('keyword')) {
    const keyword = paramMap.get('keyword')
    if (keyword) {
      return keyword
    }
  }
  return undefined
}
