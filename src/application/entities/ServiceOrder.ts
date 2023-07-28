import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"
import { Customer } from "./Customer"
import { User } from "./User"

interface ServiceOrderProps {
  createdAt: Date
  description: string
  start: Date
  finish: Date
  customer: Customer
  user: User
  paid: boolean
}

export class ServiceOrder {
  private _id: string
  private props: ServiceOrderProps

  constructor(props: Replace<ServiceOrderProps, { createdAt?: Date, paid?: boolean, start?: Date, finish?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      start: props.start ?? new Date,
      finish: props.finish ?? new Date,
      paid: props.paid ?? false,
      createdAt: props.createdAt ?? new Date
    }
  }

  public get id() {
    return this._id
  }

  public get description() {
    return this.props.description
  }

  public get start() {
    return this.props.start
  }

  public get finish() {
    return this.props.finish
  }

  public get user() {
    return this.props.user
  }

  public get customer() {
    return this.props.customer
  }

  public get paid() {
    return this.props.paid
  }

  public get createdAt() {
    return this.props.createdAt
  }
}