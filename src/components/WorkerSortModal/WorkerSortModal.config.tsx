import React from 'react';
import AbSort from 'Icons/AbSort.svg';
import BaSort from 'Icons/BaSort.svg';
import BsSort from 'Icons/BsSort.svg';
import SbSort from 'Icons/SbSort.svg';

export const sortBy = {
  name: 'name',
  lastActive: 'last_active',
  recentHashrate: 'recent_hashrate',
};
export const orderBy = {
  desc: 'desc',
  asc: 'asc',
};

export const data = [
  {
    title: 'name',
    icon: (color:string) => <AbSort fill={ color } />,
    sortType: sortBy.name,
    orderBy: orderBy.asc,
  },
  {
    title: 'name',
    icon: (color: string) => <BaSort fill={ color } />,
    sortType: sortBy.name,
    orderBy: orderBy.desc,
  },
  {
    title: 'hashrate',
    icon: (color: string) => <SbSort fill={ color } />,
    sortType: sortBy.recentHashrate,
    orderBy: orderBy.asc,
  },
  {
    title: 'hashrate',
    icon: (color: string) => <BsSort fill={ color } />,
    sortType: sortBy.recentHashrate,
    orderBy: orderBy.desc,
  },
  {
    title: 'lastActive',
    icon: (color: string) => <SbSort fill={ color } />,
    sortType: sortBy.lastActive,
    orderBy: orderBy.asc,
  },
  {
    title: 'lastActive',
    icon: (color: string) => <BsSort fill={ color } />,
    sortType: sortBy.lastActive,
    orderBy: orderBy.desc,
  },
];
