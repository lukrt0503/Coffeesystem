import React from 'react';
import { theme } from 'antd';

function BlankLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className='relative w-full min-h-full m-auto' style={{ backgroundColor: colorBgContainer }}>
      <div className='min-h-screen grid place-items-center'>{children}</div>
    </div>
  );
}

export default BlankLayout;
