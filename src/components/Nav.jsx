import React from 'react';
import Dock from '../Effect/Dock';
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from 'react-icons/vsc';

const Nav = () => {
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        className='text-white'
      />
    </div>
  );
};

export default Nav;
