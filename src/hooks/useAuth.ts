import React, { Component, useState, useEffect } from 'react';
import { LocalStorage } from '@/utils/index';

const useAuth = () => {
  let token = LocalStorage.get('token');
  return Boolean(token);
};

export default useAuth;
