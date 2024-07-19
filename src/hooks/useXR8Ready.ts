import { useState, useEffect } from 'react';
import { XR8ReadyState } from '../types'; // adjust the path as needed

const SCRIPT_NAMES = ['XR8', 'AFRAME', 'XRExtras'] as const;

const CONFIG = {
  CHECK_INTERVAL: 100, // ms
  MAX_WAIT_TIME: 10000, // 10 seconds in milliseconds
} as const;

const MAX_RETRIES = Math.floor(CONFIG.MAX_WAIT_TIME / CONFIG.CHECK_INTERVAL);

const useXR8Ready = (customPath: string | null = null): XR8ReadyState => {
  const [state, setState] = useState<XR8ReadyState>({
    xrReady: false,
    dracoReady: false,
    error: null,
  });

  useEffect(() => {
    let retries = 0;
    let intervalId: number;

    const checkScripts = () =>
      SCRIPT_NAMES.every((name) => typeof window[name] !== 'undefined');

    const initializeDracoLoader = () => {
      if (!window.AFRAME || !window.AFRAME.THREE) {
        throw new Error('A-Frame or THREE.js not available');
      }

      const THREE = window.AFRAME.THREE;

      if (!THREE.DRACOLoader) {
        throw new Error('DRACOLoader not available');
      }

      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath(
        customPath || 'https://cdn.8thwall.com/web/aframe/draco-decoder/'
      );
      dracoLoader.setDecoderConfig({ type: 'js' });

      if (THREE.GLTFLoader) {
        const originalGLTFLoader = THREE.GLTFLoader;
        THREE.GLTFLoader = function (...args: any[]) {
          const loader = new originalGLTFLoader(...args);
          loader.setDRACOLoader(dracoLoader);
          return loader;
        };
        THREE.GLTFLoader.prototype = originalGLTFLoader.prototype;

        if (window.AFRAME.components['gltf-model']) {
          const originalComponent = window.AFRAME.components['gltf-model'];
          window.AFRAME.components['gltf-model'] = {
            ...originalComponent,
            update: function (this: any, oldData: any) {
              const self = this;
              const el = this.el;
              const src = this.data;

              if (!src) return;

              this.remove();

              const loader = new THREE.GLTFLoader();
              loader.load(
                src,
                function gltfLoaded(gltfModel: any) {
                  const modelEl = self.modelEl;
                  if (!modelEl) return;
                  modelEl.object3D.children.forEach((child: any) => {
                    el.object3D.add(child);
                  });
                  el.emit('model-loaded', { format: 'gltf', model: gltfModel });
                },
                undefined /* onProgress */,
                function gltfFailed(error: Error) {
                  el.emit('model-error', { format: 'gltf', src: src });
                }
              );
            },
          };
        }

        console.log(
          'DRACO loader initialized and integrated with A-Frame GLTF system'
        );
      } else {
        throw new Error('GLTFLoader not available');
      }
    };

    const initialize = () => {
      if (checkScripts()) {
        clearInterval(intervalId);
        try {
          setState((prev) => ({ ...prev, xrReady: true }));

          initializeDracoLoader();
          setState((prev) => ({ ...prev, dracoReady: true }));
        } catch (error) {
          console.error('Initialization error:', error);
          setState((prev) => ({ ...prev, error: error as Error }));
        }
      } else if (retries >= MAX_RETRIES) {
        clearInterval(intervalId);
        const errorMessage = `Failed to load scripts after ${
          CONFIG.MAX_WAIT_TIME / 1000
        } seconds`;
        console.error(errorMessage);
        setState((prev) => ({ ...prev, error: new Error(errorMessage) }));
      } else {
        retries++;
      }
    };

    intervalId = window.setInterval(initialize, CONFIG.CHECK_INTERVAL);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [customPath]);

  return state;
};

export default useXR8Ready;
