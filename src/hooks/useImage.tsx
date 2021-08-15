import React, { Component, useState, useEffect } from 'react';

var defaultState = { image: undefined, status: 'loading' };

const useImage = (url: string, crossOrigin?: any): any => {
  const [state, setState] = useState<any>(defaultState);

  useEffect(() => {
    if (!url) return;
    var img = document.createElement('img');

    function onload() {
      setState({
        image: img,
        status: 'loaded',
        width: img.width,
        height: img.height,
      });
    }

    function onerror() {
      setState({ image: undefined, status: 'failed' });
    }

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);
    crossOrigin && (img.crossOrigin = crossOrigin);
    img.src = url;

    return () => {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
      setState(defaultState);
    };
  }, [url, crossOrigin]);

  return [state.image, state.status, state.width, state.height];
};

export default useImage;
