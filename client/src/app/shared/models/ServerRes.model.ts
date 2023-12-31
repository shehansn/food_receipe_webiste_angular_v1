export class ServerRes<T> {
  constructor(
    public message: string,
    public data?: T,
    public errors?: { [key: string]: string },
    public query?: {},
    public itemsCount?: number
  ) { }
}
