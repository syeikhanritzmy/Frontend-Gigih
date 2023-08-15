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
    <div
      className=" max-w-xs rounded overflow-hidden shadow-lg bg-cover bg-center h-[350px] w-52 m-1"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className=" bg-opacity-75 px-2 py-1 flex flex-col justify-end h-full">
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        <p className="text-gray-200 text-base">{description}</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;
