const characterMoveComponent = {
  init() {
    this.handleTouch = (e) => {
      this.positionRaw = e.detail.positionRaw;
      this.startPositionRaw = this.startPositionRaw || this.positionRaw;
    };

    this.clearTouch = (e) => {
      this.startPositionRaw = null;
    };

    window.addEventListener('onefingerstart', this.handleTouch);
    window.addEventListener('onefingermove', this.handleTouch);
    window.addEventListener('onefingerend', this.clearTouch);

    const overlay = document.getElementById('overlay');

    this.joystickParent = document.createElement('div');
    this.joystickParent.classList.add(
      'joystick-container',
      'absolute-fill',
      'shadowed'
    );

    this.joystickPosition = document.createElement('div');
    this.joystickPosition.classList.add('joystick', 'position');
    this.joystickParent.appendChild(this.joystickPosition);

    this.joystickOrigin = document.createElement('div');
    this.joystickOrigin.classList.add('joystick', 'origin');
    this.joystickParent.appendChild(this.joystickOrigin);

    overlay.appendChild(this.joystickParent);

    this.camera = document.getElementById('camera');
  },

  tick(time, timeDelta) {
    const { startPositionRaw, positionRaw, headModel } = this;

    if (startPositionRaw) {
      const isTablet = window.matchMedia('(min-width: 640px)').matches;
      const isDesktop = window.matchMedia('(min-width: 961px)').matches;

      const maxRawDistance =
        Math.min(window.innerWidth, window.innerHeight) /
        (isDesktop ? 18 : isTablet ? 17 : 8);

      let rawOffsetX = positionRaw.x - startPositionRaw.x;
      let rawOffsetY = positionRaw.y - startPositionRaw.y;

      const rawDistance = Math.sqrt(
        Math.pow(rawOffsetX, 2) + Math.pow(rawOffsetY, 2)
      );

      // Normalize to maxRawDistance
      if (rawDistance > maxRawDistance) {
        rawOffsetX *= maxRawDistance / rawDistance;
        rawOffsetY *= maxRawDistance / rawDistance;
      }

      const widthScale = 100 / window.innerWidth;
      const heightScale = 100 / window.innerHeight;

      this.joystickParent.classList.add('visible');
      this.joystickOrigin.style.left = `${startPositionRaw.x * widthScale}%`;
      this.joystickOrigin.style.top = `${startPositionRaw.y * heightScale}%`;
      this.joystickPosition.style.left = `${
        (startPositionRaw.x + rawOffsetX) * widthScale
      }%`;
      this.joystickPosition.style.top = `${
        (startPositionRaw.y + rawOffsetY) * heightScale
      }%`;

      const offsetX = rawOffsetX / maxRawDistance;
      const offsetY = rawOffsetY / maxRawDistance;

      const forward = -Math.min(Math.max(-1, offsetY), 1);
      const side = -Math.min(Math.max(-1, offsetX), 1);

      let dir;
      const moveZ = -forward * 0.4;
      const moveX = -side * 0.4;

      // get y rot of camera
      const camY = this.camera.object3D.rotation.y;

      let joystickRot = Math.atan2(forward, side);

      joystickRot -= camY;

      const speed = 0.0055;

      this.el.object3D.position.z -= speed * Math.sin(joystickRot) * timeDelta;
      this.el.object3D.position.x -= speed * Math.cos(joystickRot) * timeDelta;

      this.el.object3D.rotation.y = -joystickRot - Math.PI / 2;

      this.el.setAttribute('animation-mixer', {
        clip: 'Running',
        loop: 'repeat',
        crossFadeDuration: 0.4,
      });
    } else {
      this.el.setAttribute('animation-mixer', {
        clip: 'Idle',
        loop: 'repeat',
        crossFadeDuration: 0.4,
      });

      this.joystickParent.classList.remove('visible');
    }
  },

  remove() {
    window.removeEventListener('onefingerstart', this.handleTouch);
    window.removeEventListener('onefingermove', this.handleTouch);
    window.removeEventListener('onefingerend', this.clearTouch);

    this.joystickParent.parentNode.removeChild(this.joystickParent);
  },
};

const characterRecenterComponent = {
  init() {
    const recenterBtn = document.getElementById('recenterBtn');
    recenterBtn.addEventListener('click', () => {
      recenterBtn.classList.add('pulse-once');
      setTimeout(() => {
        recenterBtn.classList.remove('pulse-once');
      }, 500);
      this.el.sceneEl.emit('recenter');
      this.el.object3D.position.set(0, 0, 0);
    });
  },
};

export { characterMoveComponent, characterRecenterComponent };
