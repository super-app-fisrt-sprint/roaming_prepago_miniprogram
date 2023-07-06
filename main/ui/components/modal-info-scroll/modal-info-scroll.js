Component({
  props: {
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
      this.props.onPrimaryButtonTap();
    }
  }
});
