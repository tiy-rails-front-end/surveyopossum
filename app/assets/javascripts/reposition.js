$(function() {

  var reorderButton = $('.reorder-question');

  reorderButton.click(function(e) {
    e.preventDefault();
  })

  reorderButton.mousedown(reposition);

  function reposition(e) {
    var elemPosition = $(this).closest('.question-container').position();
    var elemWidth = $(this).closest('.question-container').width();
    var elemHeight = $(this).closest('.question-container').height();
    var element = $(this).closest('.question-container').replaceWith($('.filler').html());

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
      position: 'absolute'
    })

    $(document).on('selectstart dragstart', cancelTextSelection)

    $('body').mouseup(reorderDone);

    $('body').mousemove(reorder);

    function cancelTextSelection(e) {
      e.preventDefault();
      return false;
    }

    function shouldMoveUp(y) {
      var offset = $('.filler-actual').prev().offset();

      return offset && offset.top + 3 > y;
    }

    function shouldMoveDown(y) {
      var next = $('.filler-actual').next();
      var offset = next.offset();

      return offset && offset.top - 3 < y;
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
      repairQuestionIndeces();
    }
  }

  // rewrites all question indeces in the current form, brute force FTW
  function repairQuestionIndeces() {
    var questArr = $('.actual').toArray(); // creates an array of all actual question containers

    for (var i = 0; i < questArr.length; ++i) { //for each actual question container...
      adjustAttrIndex($('.question-literal', questArr[i]), 'name', i) // change its question name
      adjustAttrIndex($('.type-select', questArr[i]), 'name', i) // change its select name

      var optionArr = $('.mc-option', $(questArr[i])).toArray();

      for (var x = 0; x < optionArr.length; ++x) {
        var oldName = $(optionArr[x]).attr('name');
        $(optionArr[x]).attr('name', oldName.replace(/\d+/, i));
      }
    }
  }

  //finds and replaces a number within an specified attribute within a specified jquery node object
  function adjustAttrIndex(targetNode, attribute, index) {
    var currentAttr = targetNode.attr(attribute); // identifies attribute with which we are concerned
    targetNode.attr(attribute, currentAttr.replace( /\d+/g, index)); // changes it using super sweet regex
  }
})
