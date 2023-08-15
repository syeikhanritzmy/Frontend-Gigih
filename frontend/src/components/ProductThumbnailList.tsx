import React, { useState, useEffect } from 'react';
import ProductThumbnail from './ProductThumbnail';
import { Link, useParams } from 'react-router-dom';
import FetchApi from '../utils/FetchApi';

const ProductThumbnailList = () => {
  const { videoId } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDataProduct() {
      try {
        const apiUrlVideoDetails = `https://backend-gigih-production.up.railway.app/api/video-details/${videoId}`;
        const apiUrlProduct =
          'https://backend-gigih-production.up.railway.app/api/products';
        console.log(apiUrlVideoDetails);
        const responseProduct = await FetchApi<any>(apiUrlProduct);
        const responseVideoDetails = await FetchApi<any>(apiUrlVideoDetails);

        console.log(responseVideoDetails, 'ini response video detail');
        console.log(responseProduct, 'ini response product');

        if (responseVideoDetails.data) {
          const videoIdFromDetail = responseVideoDetails.data._id;

          const matchingProducts = responseProduct.data.filter(
            (product: any) => product.videoId === videoIdFromDetail
          );
          setProducts(matchingProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDataProduct();
  }, [videoId]);

  return (
    <div className="m-auto w-11/12  flex mt-3 overflow-x-auto">
      {products.map((data, index) => (
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
