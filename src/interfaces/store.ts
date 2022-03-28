interface Name {
  name: string,
}

export interface CategoryType extends Name {
  id: number
}

export interface ProductType extends CategoryType {
  categoryId: number,
  category: Name,
  description: string,
  image: string[],
  price: string,
  material: string,
  provider: string,
  hasDiscount: boolean | null,
  discountValue: string,
}
