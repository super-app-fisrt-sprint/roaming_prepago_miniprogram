Component({
  props: {
    url:"",
    url2:"",
    title: "",
    content: "",
    content2: "",
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
