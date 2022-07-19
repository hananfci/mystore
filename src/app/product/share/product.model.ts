export interface  IProduct
{
"title": string,
"price":number,
"description": string,
"image": string,
"category": string 
}
export interface IcartProduct{
    products:IProduct,
    amount:number
}
export interface IUserInfo{
    fullName:string,
    address:string,
    creditCardNumber:string,
}