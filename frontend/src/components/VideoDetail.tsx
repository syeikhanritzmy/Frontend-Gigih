import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FetchApi from '../utils/FetchApi';
import ProductThumbnailList from './ProductThumbnailList';

const VideoDetail: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoDetail, setVideoDetail] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };
  useEffect(() => {
    async function fetchVideoDetail() {
      try {
        const apiUrlVideoDetails = `https://backend-gigih-production.up.railway.app/api/video-details/?videoId=${videoId}`;
        const responseVideoDetail = await FetchApi<any>(apiUrlVideoDetails);
        if (responseVideoDetail) {
          const urlYoutube = responseVideoDetail.data[0].linkVideo;
          const urlParams = new URLSearchParams(new URL(urlYoutube).search);
          const idYoutube = urlParams.get('v');
          const videoDetailObject = {
            id: responseVideoDetail.data[0]._id,
            title: responseVideoDetail.data[0].title,
            description: responseVideoDetail.data[0].description,
            linkVideo: idYoutube,
          };
          setVideoDetail(videoDetailObject);
        }
      } catch (error) {
        console.error('Error fetching video detail:', error);
      }
    }

    fetchVideoDetail();
  }, [videoId]);

  //
  return (
    <>
      <div className="w-11/12 m-auto">
        <button
          className="bg-green-300 px-4 py-2 uppercase font-semibold"
          onClick={handleBackClick}
        >
          goBack
        </button>
      </div>

      {videoDetail ? (
        <div className="flex w-full h-full justify-center mt-4">
          <div className="w-11/12 h-[500px] ">
            <iframe
              className="w-full h-full rounded-md"
              src={`https://www.youtube.com/embed/${videoDetail.linkVideo}`}
              title="Embedded video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <ProductThumbnailList />
    </>
  );
};

export default VideoDetail;
