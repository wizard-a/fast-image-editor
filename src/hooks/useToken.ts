import React, { Component, useState, useEffect } from 'react';
import { LocalStorage } from '@/utils/index';
import { getToken } from '@/utils/util';

const useToken = () => {
  const [token, setToken] = useState<String>();
  useEffect(() => {
    let tokenStr = getToken();
    setToken(tokenStr);
  }, []);

  return token;
};

export default useToken;
