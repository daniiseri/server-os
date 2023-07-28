import { randomUUID } from "crypto"
import { Replace } from "../../helpers/Replace"

interface UserProps {
  createdAt: Date
  name?: string
  email: string
  password: string
}

export class User {
  private _id: string
  private props: UserProps

  private validateEmail(email: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email)
  }


  constructor(props: Replace<UserProps, { name?: string, createdAt?: Date, password?: string }>, id?: string) {
    if(!this.validateEmail(props.email)){
      throw new Error('Invalid e-mail')
    }

    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      password: props.password ?? '',
      name: props.name ?? '',
      createdAt: props.createdAt ?? new Date
    }
  }


  public get id(){
    return this._id
  }

  public get name(){
    return this.props.name
  }

  public get email(){
    return this.props.email
  }

  public get password(){
    return this.props.password 
  }

  public get createdAt(){
    return this.props.createdAt
  }
}