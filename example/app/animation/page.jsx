'use client';

import { useXR8Ready } from 'react-8thwall-aframe';

const AnimationSample = () => {
  const { xrReady, dracoReady } = useXR8Ready();
  if (!xrReady || !dracoReady) {
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
        light='type: directional; intensity: 0.8; castShadow: true; shadowMapHeight:2048; shadowMapWidth:2048; shadowCameraTop: 10; target: #model;'
        xrextras-attach='target: model; offset: 1 15 3;'
        shadow
      ></a-entity>

      <a-light type='ambient' intensity='0.7'></a-light>

      <a-entity
        id='model'
        gltf-model='/assets/dog.glb'
        scale='3.5 3.5 3.5'
        shadow='cast: true'
        position='0 0 -2'
        animation-mixer='clip: *; loop: repeat'
        xrextras-hold-drag=''
        xrextras-one-finger-rotate='factor: 1'
        xrextras-pinch-scale=''
      ></a-entity>
      <a-plane
        id='ground'
        rotation='-90 0 0'
        width='1000'
        height='1000'
        material='shader: shadow'
        shadow
      ></a-plane>
    </a-scene>
  );
};

export default AnimationSample;
