import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"
import { Service } from "./Service"
import { ServiceOrder } from "./ServiceOrder"

interface ServiceWithServiceOrderProps {
  service: Service
  serviceOrder: ServiceOrder
  quantity: number    
  subTotal: number      
}

export class ServiceWithServiceOrder{
  private _id: string
  private props: ServiceWithServiceOrderProps

  constructor(props: Replace<ServiceWithServiceOrderProps, { quantity?: number, subTotal?: number }>, id?: string){
    const quantity = props.quantity ?? 1

    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      quantity,
      subTotal: props.subTotal ?? props.service.price * quantity
    }
  }

  public get service(){
    return this.props.service
  }

  public get serviceOrder(){
    return this.props.serviceOrder
  }

  public get quantity(){
    return this.props.quantity
  }

  public get subTotal(){
    return this.props.subTotal
  }
}