import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import VideoThumbnailList from './components/VideoThumbnailList';
import VideoDetail from './components/VideoDetail';
import Navbar from './components/Navbar';
import DetailProduct from './components/DetailProduct';
export const RoutesApp = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<VideoThumbnailList />} />
        </Route>
        <Route path="/detail/:videoId" element={<VideoDetail />}></Route>
        <Route path="detail/:videoId/:_id" element={<DetailProduct />} />
      </Routes>
    </>
  );
};
