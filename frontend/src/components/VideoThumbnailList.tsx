import React, { useEffect, useState } from 'react';
import FetchApi from '../utils/FetchApi';
import VideoThumbnail, { VideoThumbnailCard } from './VideoThumbnail';
import { Link } from 'react-router-dom';

const VideoThumbnailList: React.FC = () => {
  const [videoThumb, setVideoThumb] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = 'http://localhost:3000/api/video-thumbnails/';
      const apiUrlVideoDetails = 'http://localhost:3000/api/video-details/';

      try {
        const response = await FetchApi<any>(apiUrl);
        const responseVideoDetail = await FetchApi<any>(apiUrlVideoDetails);


        if (response && responseVideoDetail) {
          const data = response.data;
          const videoDetailData = responseVideoDetail.data;

          const mergedData = data.map((thumbnail: any) => {
            const correspondingVideoDetail = videoDetailData.find(
              (detail: any) => detail.videoId === thumbnail.videoId
            );
            return {
              videoId: thumbnail.videoId,
              thumbnailUrl: thumbnail.urlImageThumbnail,
              title: correspondingVideoDetail?.title || '',
              description: correspondingVideoDetail?.description || '',
            };
          });

          setVideoThumb(mergedData);
        }
        console.log(videoThumb);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  console.log(videoThumb);
  return (
    <div className="flex flex-wrap h-full justify-start ">
      {videoThumb.map((data, index) => (
        <Link key={index} to={`detail/${data.videoId}`}>
          <VideoThumbnail
            imageUrl={data.thumbnailUrl}
            description={`${data.description}`}
            title={`${data.title}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default VideoThumbnailList;
