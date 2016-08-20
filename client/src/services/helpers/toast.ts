declare const Materialize: any;

export default class Toast {
  toast(message, classes = 'green', duration = 5000) {
    classes += ' rounded';

    return new Promise((success) => {
      Materialize.toast(message, duration, classes, () => success());
    });
  }

  success(message, duration?) {
    return this.toast(message, 'teal accent-4', duration);
  }

  error(message, duration?) {
    return this.toast(message, 'red', duration);
  }

  warning(message, duration?) {
    return this.toast(message, 'yellow lighten-1 black-text', duration);
  }
}
