document.execCommand = (function(_execCommand) {
  var frag = document.createDocumentFragment(),
      isBuggy = true;

  function complete(element, result) {
    if (result) {
      var event = document.createEvent('Event');
      event.initEvent('input', true, false);
      element.dispatchEvent(event);
    }
    return result;
  }

  function getEditable(node) {
    while (node &&
        !(node.nodeType == 1 && node.hasAttribute('contenteditable'))) {
      node = node.parentNode;
    }
    return node;
  }

  function getNodeName(node) {
    return node ? node.nodeName.toLowerCase() : '';
  }

  function getSelected(node) {
    return isTextNode(node) ? node.parentNode : node;
  }

  function isTextNode(node) {
    return node != null && node.nodeType == 3;
  }

  function isBoldWrapper(node) {
    return (getNodeName(node) == 'span') &&
      (node.getAttribute('style') == 'font-weight: normal;') &&
      (node.childNodes.length == 1) && isTextNode(node.firstChild);
  }

  function removeNode(node) {
    var parent = node != null && node.parentNode;
    return parent ? parent.removeChild(node) : node;
  }

  function replaceNode(node, replacement) {
    node.parentNode.replaceChild(replacement, node);

    var children = node.childNodes,
        length = children.length;

    if (length) {
      while (length--) {
        frag.appendChild(children[0]);
      }
      replacement.appendChild(frag);
    }
    return node;
  }

  function restore() {
    isBuggy = false;
    document.execCommand = _execCommand;
  }

  function exec(cmd, ui, arg) {
    return _execCommand.call(document, cmd, ui, arg);
  }

  function shimExec(selection, cmd, ui, arg) {
    var node = selection.anchorNode,
        selected = getSelected(node),
        editable = getEditable(selected);

    switch (cmd) {
      case 'bold':
        var style = getComputedStyle(selected, null),
            fontWeight = parseFloat(style.fontWeight) || 0,
            nextSib = node.nextSibling;

        if (isBoldWrapper(nextSib)) {
          replaceNode(nextSib, nextSib.firstChild);

          var left = node,
              middle = node.nextSibling,
              right = middle.nextSibling;

          node.textContent += (
            removeNode(middle).textContent +
            removeNode(right).textContent
          );

          return complete(editable, true);
        }
        if (fontWeight >= 700) {
          var range = selection.getRangeAt(0),
              left = node,
              middle = left.splitText(range.startOffset),
              right = middle.splitText(range.endOffset),
              span = document.createElement('span');

          span.style.fontWeight = 'normal';
          replaceNode(middle, span);
          span.appendChild(middle);
          return complete(editable, true);
        }
        break;
      case 'formatBlock':
        if (getNodeName(selected) == 'blockquote') {
          var nodes = selected.childNodes,
              replacement = document.createElement(arg);

          replaceNode(selected, document.createElement(arg));
          return complete(editable, true);
        }
        break;
    }
    return complete(editable, exec(cmd, ui, arg));
  }

  function shim(selection, cmd, ui, arg) {
    var editable = getEditable(selection.anchorNode);
    editable.addEventListener('input', restore, true);

    var result = exec(cmd, ui, arg);
    editable.removeEventListener('input', restore, true);

    if (isBuggy) {
      shim = shimExec;
      return complete(editable, result);
    }
    return result;
  }

  function wrapper(cmd, ui, arg) {
    var selection = document.getSelection(),
        editable = getEditable(selection.anchorNode);

    return (editable && editable.isContentEditable)
      ? shim(selection, cmd, ui, arg)
      : exec(cmd, ui, arg);
  }

  return wrapper;
}(document.execCommand));
