$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.transitioning = false;

  if (!this.transitioning) {
    this.$el.find('.slide-right').on('click', this.slideRight.bind(this));
    this.$el.find('.slide-left').on('click', this.slideLeft.bind(this));
  }
};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true;
  var currentActiveImg = this.$el.find('.items img').eq(this.activeIdx);
  var a, b;

  if (dir === 1) {
    a = "left";
    b = "right";
  } else {
    a = "right";
    b = "left";
  }
  currentActiveImg.addClass(a);

  currentActiveImg.one('transitionend', function () {
    currentActiveImg.removeClass('active left right');
    this.transitioning = false;
  }.bind(this));

  this.activeIdx = (this.activeIdx + dir) % (this.$el.find('.items img').length);
  var newActiveImage = this.$el.find('.items img').eq(this.activeIdx);
  newActiveImage.addClass(b);
  setTimeout(function () {
    newActiveImage.removeClass(b).addClass("active");
  }, 0);
};

$.Carousel.prototype.slideRight = function (dir) {
  this.slide(-1);
};

$.Carousel.prototype.slideLeft = function (dir) {
  this.slide(1);
};

$.Carousel.prototype.leftID = function () {
  return (this.activeIdx - 1) % (this.$el.find('.items img').length);
}

$.Carousel.prototype.rightID = function () {
  return (this.activeIdx + 1) % (this.$el.find('.items img').length);
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
