import React, { useEffect, useState } from 'react';
import FetchApi from '../utils/FetchApi';
import VideoThumbnail from './VideoThumbnail';
import { Link } from 'react-router-dom';

const VideoThumbnailList: React.FC = () => {
  const [videoThumb, setVideoThumb] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const apiUrl =
        'https://backend-gigih-production.up.railway.app/api/video-thumbnails/';
      const apiUrlVideoDetails =
        'https://backend-gigih-production.up.railway.app/api/video-details/';

      try {
        const response = await FetchApi<any>(apiUrl);
        const responseVideoDetail = await FetchApi<any>(apiUrlVideoDetails);

        if (response && responseVideoDetail) {
          const data = response.data;
          const videoDetailData = responseVideoDetail.data;

          const mergedData = data.map((thumbnail: any) => {
            const correspondingVideoDetail = videoDetailData.find(
              (detail: any) => detail._id === thumbnail.videoId
            );

            // Mengambil hanya 5 kata pertama dari deskripsi
            const descriptionWords = correspondingVideoDetail?.description
              ? correspondingVideoDetail.description
                  .split(' ')
                  .slice(0, 5)
                  .join(' ')
              : '';

            return {
              videoId: thumbnail.videoId,
              thumbnailUrl: thumbnail.urlImageThumbnail,
              title: correspondingVideoDetail?.title || '',
              description: descriptionWords,
            };
          });

          setVideoThumb(mergedData);
          setIsLoading(false);
        }
        console.log(videoThumb);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div>Loading ...</div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap h-full justify-start  ">
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
        </>
      )}
    </>
  );
};

export default VideoThumbnailList;
