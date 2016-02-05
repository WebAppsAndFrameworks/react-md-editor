document.execCommand = (function(_execCommand) {
  var isBuggy = true;

  function complete(element, result) {
    if (result) {
      var event = document.createEvent('Event');
      event.initEvent('input', true, false);
      element.dispatchEvent(event);
    }
    return result;
  }

  function getEditable(element) {
    while (element &&
        !(element.nodeType == 1 && element.hasAttribute('contenteditable'))) {
      element = element.parentNode;
    }
    return element;
  }

  function restore() {
    isBuggy = false;
    document.execCommand = _execCommand;
  }

  function exec(cmd, ui, arg) {
    return _execCommand.call(document, cmd, ui, arg);
  }

  function shimExec(element, cmd, ui, arg) {
    return complete(element, exec(cmd, ui, arg));
  }

  function shim(element, cmd, ui, arg) {
    element.addEventListener('input', restore, true);
    var result = exec(cmd, ui, arg);
    element.removeEventListener('input', restore, true);
    if (isBuggy) {
      shim = shimExec;
      return complete(element, result);
    }
    return result;
  }

  function wrapper(cmd, ui, arg) {
    var element = getEditable(getSelection().anchorNode);
    return (element && element.isContentEditable)
      ? shim(element, cmd, ui, arg)
      : exec(cmd, ui, arg);
  }

  return wrapper;
}(document.execCommand));
