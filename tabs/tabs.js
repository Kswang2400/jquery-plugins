$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data('content-tabs'));
  this.$activeTab = this.$contentTabs.find('.active');

  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (ev) {
  var newActiveTab = this.$contentTabs.find($(ev.currentTarget).attr('for'));

  this.$el.find('.active').removeClass('active');
  $(ev.currentTarget).addClass('active');
  this.$activeTab.toggleClass('active transitioning');

  this.transition(newActiveTab);
};

$.Tabs.prototype.transition = function (newActiveTab) {
  this.$activeTab.one('transitionend', function () {
    this.$activeTab.removeClass('transitioning');
    newActiveTab.removeClass('transitioning');

    this.$activeTab = newActiveTab.addClass('active transitioning');
    setTimeout(function () {
      this.$activeTab.removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));
}

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
