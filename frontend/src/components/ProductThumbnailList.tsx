import React, { useState, useEffect } from 'react';
import ProductThumbnail from './ProductThumbnail';
import { Link } from 'react-router-dom';
import FetchApi from '../utils/FetchApi';

const ProductThumbnailList = () => {
  const [product, setProduct] = useState<any[]>([]);
  useEffect(() => {
    async function fetchDataProduct() {
      try {
        const apiUrlProduct = 'http://localhost:3000/api/products';
        const responseProduct = await FetchApi<any>(apiUrlProduct);
        if (responseProduct) {
          setProduct(responseProduct.data);
        }
      } catch (error) {}
    }
    fetchDataProduct();
  }, []);
  return (
    <div className="m-auto w-11/12  flex mt-3">
      {product.map((data, index) => (
        <Link key={index} to={`${data._id}`}>
          <ProductThumbnail
            imgthumbnail={data.imgthumbnail}
            price={data.price}
            title={data.title}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductThumbnailList;
