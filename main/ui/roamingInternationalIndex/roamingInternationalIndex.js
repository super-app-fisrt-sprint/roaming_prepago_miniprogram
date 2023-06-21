Page({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
  },
  onLoad() {

    const { titleBarHeight, statusBarHeight } = my.getSystemInfoSync();
    this.setData({
      titleBarHeight,
      statusBarHeight,
    });
  },
});
