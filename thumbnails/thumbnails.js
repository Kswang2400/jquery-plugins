$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$activeImg = this.$el.find('.gutter-images img').first();
  this.activate(this.$activeImg);

  this.$el.find('.gutter-images img').on('click', function (ev) {
    this.activate($(ev.currentTarget));
  }.bind(this));
};


$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};

$.Thumbnails.prototype.activate = function($img) {
  this.$el.find('.active img').remove();
  this.$el.find('.active').append($('<img>').attr('src', $img.attr('src')));
};
