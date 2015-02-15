$(function() {

  var reorderButton = $('.reorder-question');

  reorderButton.click(function(e) {
    e.preventDefault();
  })

  reorderButton.mousedown(reposition);

  function reposition(e) {
    var elemPosition = $(this).closest('.question-container').offset();
    var elemWidth = $(this).closest('.question-container').width();
    var elemHeight = $(this).closest('.question-container').height();
    var element = $(this).closest('.question-container').clone(true);
    $(this).closest('.question-container').replaceWith($('.filler').html());

    var shiftX = e.pageX - elemPosition.left;
    var shiftY = e.pageY - elemPosition.top;

    $('.filler-actual').css({
      height: elemHeight,
      width: elemWidth
    });

    $('body').append(element);

    element.addClass('target');


    $('.target').css({
      width: elemWidth,
      top: e.pageY - shiftY,
      left: e.pageX - shiftX,
      position: 'absolute',
    })

    $(document).on('selectstart dragstart', cancelTextSelection)

    $('body').mouseup(reorderDone);

    $('body').mousemove(reorder);

    function cancelTextSelection(e) {
      e.preventDefault();
      return false;
    }

    function shouldMoveUp(y) {
      var offset = $('.filler-actual').prev('.actual').offset();

      return offset && offset.top > y;
    }

    function shouldMoveDown(y) {
      var next = $('.filler-actual').next('.actual');
      var offset = next.offset();

      return offset && offset.top < y;
    }
    // e in this function is the mouse movement, pageY/X are the coordinates
    function reorder(e) {
      $('.target').css({
        top: e.pageY - shiftY,
        left: e.pageX - shiftX
      })
      if (shouldMoveUp(element.offset().top)) {
        $('.filler-actual').insertBefore($('.filler-actual').prev());
      } else if (shouldMoveDown(element.offset().top)) {
        $('.filler-actual').insertAfter($('.filler-actual').next());
      }

      return false;
    }

    function reorderDone() {
      element.removeClass('target');
      element.css({
        width: 'auto',
        position: 'relative',
        top: 0,
        left: 0
      })
      $('.filler-actual').replaceWith(element);
      $('.reorder-question', element).on('mousedown', reposition);
      $('body').off('mouseup', reorderDone);
      $('body').off('mousemove', reorder);
      $(document).off('selectstart, dragstart', cancelTextSelection);
      repairQuestionindices();
    }
  }

  function repairQuestionindices() {
    var questArr = $('.actual').toArray();

    for (var i = 0; i < questArr.length; ++i) {
      adjustAttrIndex($('.question-literal', questArr[i]), 'name', i)
      adjustAttrIndex($('.question-literal', questArr[i]), 'id', i)
      adjustAttrIndex($('.type-select', questArr[i]), 'name', i)
      adjustAttrIndex($('.type-select', questArr[i]), 'id', i)
      adjustAttrIndex($('.required-checkbox', questArr[i]), 'name', i)
      adjustAttrIndex($('.required-checkbox', questArr[i]), 'id', i)

      var optionArr = $('.mc-option', $(questArr[i])).toArray();

      for (var x = 0; x < optionArr.length; ++x) {
        var oldName = $(optionArr[x]).attr('name');
        $(optionArr[x]).attr('name', oldName.replace(/\d+/, i));
        $(optionArr[x]).attr('id', oldName.replace(/\d+/, i));
      }
    }
  }

  function adjustAttrIndex(targetNode, attribute, index) {
    var currentAttr = targetNode.attr(attribute);
    targetNode.attr(attribute, currentAttr.replace( /\d+/g, index));
  }
})
