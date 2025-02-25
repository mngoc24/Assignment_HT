interface IProduct {
  id: number|string
  name: string
  price: number
  image: string
  shortDesc: string
  description: string
  category: string
}
export default IProduct

export type ProductInput = Omit<IProduct, "id">

export interface ICategory{
  catId?: string | number
  name: string
  image: string
}