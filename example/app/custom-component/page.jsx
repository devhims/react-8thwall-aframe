'use client';

import { useXR8Ready, useAFrameComponents } from 'react-8thwall-aframe';
import ColorChangeOnClick from '@/components/aframe/change-color-on-click';

const CustomComponent = () => {
  const { xrReady } = useXR8Ready();

  const components = {
    'color-change-on-click': ColorChangeOnClick,

    // Add other components here
  };

  const componentsRegistered = useAFrameComponents(components);

  if (!xrReady || !componentsRegistered) {
    return <div>Loading...</div>;
  }
  return (
    <a-scene
      xrextras-gesture-detector
      landing-page
      xrextras-loading
      xrextras-runtime-error
      renderer='colorManagement: true'
      xrweb='allowedDevices: any'
    >
      <a-camera
        id='camera'
        position='0 2 2'
        raycaster='objects: .cantap'
        cursor='fuse: false; rayOrigin: mouse;'
      ></a-camera>

      <a-entity
        light='
        type: directional; 
        castShadow: true; 
        color: white; 
        intensity: 0.5'
        position='5 10 7'
      ></a-entity>

      <a-light type='ambient' intensity='0.7'></a-light>

      <a-box
        class='cantap'
        xrextras-hold-drag=''
        xrextras-one-finger-rotate='factor: 0.8'
        xrextras-pinch-scale=''
        position='-1 0 -3'
        rotation='0 45 0'
        zmaterial='
        color: #AD50FF; shader: flat; 
        src: https://cdn.8thwall.com/web/assets/cube-texture.png'
        shadow
        color='#4CC3D9'
        color-change-on-click='colors: #4CC3D9, #FFC65D, #7BC8A4'
      ></a-box>
      <a-plane
        id='ground'
        rotation='-90 0 0'
        width='1000'
        height='1000'
        material='shader: shadow; opacity: 0.67'
        shadow
      ></a-plane>
    </a-scene>
  );
};

export default CustomComponent;
