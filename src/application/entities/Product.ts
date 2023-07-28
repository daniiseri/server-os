import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

interface ProductProps {
  description: string
  purchasePrice?: number
  salePrice: number
  stock: number
}

export class Product {
  private _id: string
  private props: ProductProps

  constructor(props: Replace<ProductProps, { salePrice?: number, stock?: number }>, id?: string) {
    this._id = id ?? randomUUID()

    this.props = {
      ...props,
      salePrice: props.salePrice ?? 0,
      stock: props.stock ?? 0
    }
  }

  public get id() {
    return this._id
  }

  public get description() {
    return this.props.description
  }

  public get salePrice() {
    return this.props.salePrice
  }

  public get purchasePrice(){
    return this.props.purchasePrice
  } 

  public get stock() {
    return this.props.stock
  }

}