import React, { useContext } from 'react';
import ProductCard from '../../../components/ProductCard';

import { MainContext } from '../../../context/mainContext';
import { CategoryType, ProductType } from '../../../interfaces/store';

type PurchaseProdcut = {
  product: ProductType,
};

type PurchaseType = {
  date: Date,
  payMethod: { name: string };
  products: PurchaseProdcut[],
}

export default function UserPurchases(props: PurchaseType) {
  const { date, payMethod, products } = props;
  const { categories } = useContext(MainContext);

  const getCategory = (products: PurchaseProdcut[]) => {
    return products.map(({ product }) => {
      const catName = categories.find(({ id }) => product.categoryId === id) as CategoryType;
      if (catName) {
        product.category = { name: catName.name };
      }
      return product;
    });
  };

  const purchaseProducts = getCategory(products);

  return (
    <div className='pruchase-box'>
      <h5>{new Date(date).toDateString()}</h5>
      <b>Payment Method:</b>
      <p>{payMethod.name.toLocaleUpperCase()}</p>
      <b>Purchased Items:</b>
      <div className='purchase-products-box'>
        {purchaseProducts.length > 0
          && purchaseProducts.map((prod, ind) => <ProductCard key={ind} {...prod} />)}
      </div>
      <hr/>
    </div>
  );
}
