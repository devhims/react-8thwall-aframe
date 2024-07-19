import { useEffect, useRef } from 'react';
import { AFrameComponent } from '../types'; // adjust the path as needed

type ComponentsMap = Record<string, AFrameComponent>;

const useAFrameComponents = (components: ComponentsMap): boolean => {
  const registeredComponents = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!window.AFRAME) {
      console.error(
        "A-Frame is not loaded. Make sure it's included in your project."
      );
      return;
    }

    (Object.entries(components) as [string, AFrameComponent][]).forEach(
      ([name, component]) => {
        if (
          typeof component === 'object' &&
          component !== null &&
          !registeredComponents.current.has(name)
        ) {
          if (!window.AFRAME.components[name]) {
            window.AFRAME.registerComponent(name, component);
            console.log(`Registered A-Frame component: ${name}`);
            registeredComponents.current.add(name);
          } else {
            console.log(
              `A-Frame component already registered by A-Frame: ${name}`
            );
          }
        } else if (registeredComponents.current.has(name)) {
          console.log(`A-Frame component already registered by hook: ${name}`);
        } else {
          console.error(`Invalid component object for: ${name}`);
        }
      }
    );
  }, [components]);

  return true;
};

export default useAFrameComponents;
