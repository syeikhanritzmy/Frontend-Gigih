import React from 'react';

export interface VideoThumbnailCard {
  imageUrl: string;
  title: string;
  description: string;
}

const VideoThumbnail: React.FC<VideoThumbnailCard> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg h-[350px] w-52 m-1 relative">
      <div
        className="absolute inset-0 bg-black opacity-50 object-contain"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="relative bg-opacity-40 bg-black px-2 py-1 flex flex-col justify-end h-full">
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        <p className="text-gray-200 text-base">{description}</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;
