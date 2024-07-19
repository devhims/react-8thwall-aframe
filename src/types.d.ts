export interface AFrameComponent {
  init?: () => void;
  update?: () => void;
  tick?: () => void;
  remove?: () => void;
  pause?: () => void;
  play?: () => void;
  [key: string]: any;
}

export interface AFrame {
  registerComponent: (name: string, component: AFrameComponent) => void;
  components: Record<string, unknown>;
  THREE: any;
  [key: string]: any;
}

export interface XR8ReadyState {
  xrReady: boolean;
  dracoReady: boolean;
  error: Error | null;
}

declare global {
  interface Window {
    AFRAME: AFrame;
    XR8: any;
    XRExtras: any;
  }
}
