import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"
import { Product } from "./Product"
import { ServiceOrder } from "./ServiceOrder"

interface ProductWithServiceOrderProps {
  quantity: number
  serviceOrder: ServiceOrder
  product: Product
  subTotal: number
}

export class ProductWithServiceOrder {
  private _id: string
  private props: ProductWithServiceOrderProps

  constructor(props: Replace<ProductWithServiceOrderProps, { quantity?: number, subTotal?: number }>, id?: string){
    const quantity = props.quantity ?? 1
    
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      quantity,
      subTotal: props.subTotal ?? quantity * props.product.salePrice
    }
  }

  public get id(){
    return this._id
  }
  
  public get product(){
    return this.props.product
  }
  
  public get serviceOrder(){
    return this.props.serviceOrder
  }
  
  public get subTotal(){
    return this.props.subTotal
  }

  public get quantity(){
    return this.props.quantity
  }
}