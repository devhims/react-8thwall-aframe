'use client';

import './interaction.css';

import { useXR8Ready, useAFrameComponents } from 'react-8thwall-aframe';
import {
  characterMoveComponent,
  characterRecenterComponent,
} from '@/components/aframe/character-control';

const Interaction = () => {
  const { xrReady } = useXR8Ready();

  const components = {
    'character-move': characterMoveComponent,
    'character-recenter': characterRecenterComponent,

    // Add other components here
  };

  const componentsRegistered = useAFrameComponents(components);

  if (!xrReady || !componentsRegistered) {
    return <div className='loading-overlay'>Loading XR...</div>;
  }

  return (
    <>
      <div id='overlay' style={{ zIndex: 2 }}>
        <img id='recenterBtn' src='/assets/reset.svg' />
        <h3>DRAG TO MOVE</h3>
      </div>

      <a-scene
        xrextras-gesture-detector
        landing-page
        xrextras-loading
        xrextras-runtime-error
        renderer='colorManagement:true'
        xrweb='allowedDevices: any'
      >
        <a-camera id='camera' position='0 4 4'></a-camera>

        <a-entity
          light='
      type: directional;
      intensity: 0.9;
      castShadow: true;
      shadowMapHeight:2048;
      shadowMapWidth:2048;
      target: #character;
      shadowRadius: 5'
          xrextras-attach='target: character; offset: 8 15 4'
          position='1 4.3 2.5'
          shadow
        ></a-entity>

        <a-light type='ambient' intensity='0.5'></a-light>

        <a-entity
          id='character'
          character-move
          character-recenter
          gltf-model='/assets/robot.glb'
          gltf-morph='morphtarget: Surprised; value: 0'
          animation-mixer='clip: Idle; loop: repeat; crossFadeDuration: 0.4'
          scale='0.5 0.5 0.5'
          shadow
        ></a-entity>

        <a-box
          id='ground'
          scale='1000 2 1000'
          position='0 -1 0'
          material='shader: shadow; transparent: true; opacity: 0.4'
          shadow
        ></a-box>
      </a-scene>
    </>
  );
};

export default Interaction;
