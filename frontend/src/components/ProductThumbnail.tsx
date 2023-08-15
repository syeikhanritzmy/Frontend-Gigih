import React from 'react';

interface ProductThumbnailProps {
  price: Number;
  title: String;
  imgthumbnail: String;
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  price,
  title,
  imgthumbnail,
}) => {
  const formattedPrice = price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      <div className="w-32 border rounded-lg p-1 bg-slate-50 m-2">
        <img
          src={`${imgthumbnail}`}
          alt="Gambar"
          className="w-full h-36 object-cover rounded-md mb-2"
        />
        <p className="text-xs font-medium">{formattedPrice}</p>
        <p className="text-sm">{title}</p>
      </div>
    </>
  );
};

export default ProductThumbnail;
