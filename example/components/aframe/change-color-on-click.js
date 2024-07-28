const ColorChangeOnClick = {
  schema: {
    colors: { type: 'array', default: ['#FF0000', '#00FF00', '#0000FF'] },
  },

  init: function () {
    this.colorIndex = 0;
    this.el.addEventListener('click', this.changeColor.bind(this));
  },

  changeColor: function () {
    this.colorIndex = (this.colorIndex + 1) % this.data.colors.length;
    this.el.setAttribute(
      'material',
      'color',
      this.data.colors[this.colorIndex]
    );
    console.log(`Color changed to ${this.data.colors[this.colorIndex]}`);
  },

  remove: function () {
    this.el.removeEventListener('click', this.changeColor);
  },
};

export default ColorChangeOnClick;
