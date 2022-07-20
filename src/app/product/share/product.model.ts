export interface  IProduct
{
"title": string,
"price":number,
"description": string,
"image": string,
"category": string,
"id": number,
}
export interface IcartProduct{
    id:number,
    product:IProduct,
    amount:number
}
export interface IUserInfo{
    fullName:string,
    address:string,
    creditCardNumber:string,
}