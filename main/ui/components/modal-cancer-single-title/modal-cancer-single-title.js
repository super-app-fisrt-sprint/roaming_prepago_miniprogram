Component({
  props: {
    url:"",
    title: "",
    content: "",
    visibleOne: false,
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
    }
  }
});
