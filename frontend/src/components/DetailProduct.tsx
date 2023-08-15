import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FetchApi from '../utils/FetchApi';

const DetailProduct = () => {
  const { _id } = useParams<{ _id: string }>();
  const [productDetail, setProductDetail] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const apiUrlProductDetail = `http://localhost:3000/api/products/?_id=${_id}`;

        const responseProductDetail = await FetchApi<any>(apiUrlProductDetail);

        if (responseProductDetail) {
          const foundProduct = responseProductDetail.data.find(
            (data: any) => data._id === _id
          );
          if (foundProduct) {
            setProductDetail(foundProduct);
          }
        }
      } catch (error) {}
    }
    fetchProductDetail();
  }, [_id]);
  const formattedPrice = productDetail?.price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      {productDetail ? (
        <div className="flex w-11/12 justify-between  m-auto">
          <div className="object-cover w-6/12 h-full ">
            <img src={`${productDetail.imgthumbnail}`} className="rounded-lg" />
          </div>
          <div className="w-6/12 px-8">
            <h1 className="font-bold my-4 text-6xl uppercase">
              {productDetail.title}
            </h1>
            <p className="text-lg">{productDetail.description}</p>
            <p className="font-medium">{formattedPrice}</p>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default DetailProduct;
