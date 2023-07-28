export class AppError extends Error {
  public statusCode: number

  constructor(message: string, statusCode?: number){
    super(message)
    this.statusCode = statusCode ?? 400
  }
}

export class NotFoundError extends AppError {
  constructor(message: string){
    super(message, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string){
    super(message, 401)
  }
}