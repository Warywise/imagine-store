import { CategoryType, ProductType } from './store';

interface UserId {
  userId: number,
}

export interface Adress extends UserId {
  adress: string,
  city: string,
  state: string,
}

export interface Card extends UserId {
  cardName: string,
  cardNumber: string,
  cardValidity: string,
  cpf: string,
}

export interface Purchase {
  date: Date,
  payMethod: CategoryType,
  products: ProductType[],
}

export interface InfosType {
  cpf: string | null,
  userAdresses: Adress[],
  userCards: Card[],
  userPurchases: Purchase[],
}
