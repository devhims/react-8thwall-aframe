import React from 'react';

interface XR8ScriptsProps {
  xr8ApiKey: string;
  remoteJsChannel?: string;
  aframeVersion?: string;
  aframeExtrasVersion?: string;
}

const XR8Scripts: React.FC<XR8ScriptsProps> = ({
  xr8ApiKey,
  remoteJsChannel = '',
  aframeVersion = '1.3.0',
  aframeExtrasVersion = '6.1.1',
}) => {
  return (
    <>
      {remoteJsChannel && (
        <script
          src='https://remotejs.com/agent/agent.js'
          data-consolejs-channel={remoteJsChannel}
          async
        />
      )}
      <script
        src={`//cdn.8thwall.com/web/aframe/8frame-${aframeVersion}.min.js`}
      />
      <script src='//cdn.8thwall.com/web/xrextras/xrextras.js' async />
      <script
        src={`//cdn.8thwall.com/web/aframe/aframe-extras-${aframeExtrasVersion}.min.js`}
        async
      />
      <script src='//cdn.8thwall.com/web/aframe/ammo.wasm.js' async />
      <script
        src='//cdn.8thwall.com/web/aframe/aframe-physics-system-4.0.1.min.js'
        async
      />
      <script src={`//apps.8thwall.com/xrweb?appKey=${xr8ApiKey}`} async />
    </>
  );
};

export default XR8Scripts;
