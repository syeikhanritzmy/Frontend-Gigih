import React from 'react';
import { Outlet } from 'react-router-dom';
import VideoThumbnailList from './VideoThumbnailList';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <VideoThumbnailList />
    </>
  );
};

export default Layout;
