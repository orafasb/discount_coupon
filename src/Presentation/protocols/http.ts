export interface HttpRequest {
  body?: any
  query?: any
  headers?: any
  method?: string
  params?: any
  url?: string

}

export interface HttpResponse {
  body: any
  statusCode: number
  couponValid?: object
  message?: object
}
