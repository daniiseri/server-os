import { randomUUID } from "crypto"
import { ServiceOrder } from "./ServiceOrder"
import { Replace } from "../../helpers/Replace"

interface CustomerProps {
  createdAt: Date
  name: string
  serviceOrders?: ServiceOrder[]
}

export class Customer {
  private _id: string
  private props: CustomerProps

  constructor(props: Replace<CustomerProps, { createdAt?: Date }>, id?: string){
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date
    }
  }

  public get id(){
    return this._id
  }

  public get name(){
    return this.props.name
  }

  public get createdAt(){
    return this.props.createdAt
  }

  public get serviceOrders(){
    return this.props.serviceOrders
  }
}