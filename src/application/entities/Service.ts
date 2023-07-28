import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

interface ServiceProps {
  name: string
  description?: string
  price: number
}

export class Service {
  private _id: string
  private props: ServiceProps

  constructor(props: Replace<ServiceProps, { price?: number }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      price: props.price ?? 0
    }
  }

  public get id() {
    return this._id
  }

  public get name() {
    return this.props.name
  }

  public get description() {
    return this.props.description
  }

  public get price() {
    return this.props.price
  }
}