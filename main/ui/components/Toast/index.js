import { ToastDefaultProps } from './props';
import fmtEvent from '../../../../node_modules/antd-mini/es/_util/fmtEvent';
Component({
    props: ToastDefaultProps,
    data: {
        show: false,
        timer: null,
    },
    didUpdate: function (prev) {
        if (!prev.visible && this.props.visible) {
            this.handleShowToast();
        }
        else if (!this.props.visible && this.data.show) {
            this.closeMask();
        }
    },
    didMount: function () {
        if (this.props.visible) {
            this.handleShowToast();
        }
    },
    methods: {
        closeMask: function () {
            var _a, _b;
            if (this.data.timer) {
                clearTimeout(this.data.timer);
            }
            this.setData({ show: false, timer: null });
            (_b = (_a = this.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, fmtEvent(this.props, {}));
        },
        handleShowToast: function () {
            var _this = this;
            this.setData({ show: true });
            if (this.props.duration > 0) {
                var timer = setTimeout(function () {
                    _this.closeMask();
                }, this.props.duration);
                this.setData({ timer: timer });
            }
        },
        handleClickMask: function () {
            if (this.props.showMask && this.props.maskCloseable) {
                this.closeMask();
            }
        },
    },
});
