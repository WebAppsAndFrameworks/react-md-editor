document.execCommand = (function(func) {
  return function(cmd, ui, arg) {
    var anchorNode = window.getSelection().anchorNode;
    var element = anchorNode ? anchorNode.parentNode : null;
    if (element && element.isContentEditable) {
      var isBuggy = true;
      var capture = function() { isBuggy = false; };
      
      element.addEventListener('input', capture, true);

      var result = func.call(document, cmd, ui, arg);
      element.removeEventListener('input', capture, true);
      
      if (isBuggy) {
        var event = document.createEvent('Event');
        event.initEvent('input', true, false);
        element.dispatchEvent(event);
      }
    }
  };
}(document.execCommand));
