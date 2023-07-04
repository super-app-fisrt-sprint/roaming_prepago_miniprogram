Component({
  props: {
    title: "",
    content: "",
    visibleOne: false,
    contentUrlTitle:"",
    url:"",
    handleClose: () => {},
    primaryButtonText: "",
    onAcceptButtonTapOne: () => {}
  },
  methods: {
    handleClose() {
      this.props.onClose();
    },
    onAcceptButtonTapOne() {
      this.handleClose();
      this.props.onPrimaryButtonTap();
    },
    redirectUrl(){
      my.navigateTo({
        url:this.props.url
      })
    }

  }
});
