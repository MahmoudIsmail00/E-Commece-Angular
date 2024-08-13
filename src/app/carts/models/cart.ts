import { Product } from './../../products/models/Product';


export interface Cart{
  id:string,
  userId:string,
  date:string,
  products:Product[]
}
