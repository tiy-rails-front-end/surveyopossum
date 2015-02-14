// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {

  var addButton = $('.add-question-button');

  addButton.click(function(e) {
    e.preventDefault(); // prevent form submission
    var newQuestion = $('.blueprint').clone(true); // creates deep clone of question template
    newQuestion.removeClass('blueprint'); // removes blueprint class from clone to maintain integrity of blueprint
    newQuestion.addClass('actual'); // adds actual class to clone to identify it as an actual question
    newQuestion.appendTo('.question-list'); // inserts new question node before the submit button, aka last thing in form
    newQuestion.toggle(); // removes hidden attr from newly inserted node
    repairQuestionIndeces(); // rewrites indeces for all actual questions
    // addButton.insertBefore('.actions'); // moves the add button to the appropriate position

  })

  var typeSelector = $('.type-select');

  typeSelector.change(function(e) {
    var current = $(this); // identifying the correct type-select and storing it to var current
    if (current.val() === 'Multiple Choice') { // checking the value of the selected option against 'Multiple Choice'
      var mcOption = $('.root').clone(); // cloning root multi-choice answer field
      mcOption.removeClass('root'); // removing root class
      $(current).closest($('.question-p')).append(mcOption); // adding answer field to question
      mcOption.keyup(grow); // seeding the dynamic growth property
    }
  })

  var deleteButton = $('.delete-question');

  deleteButton.click(function(e) {
    var current = $(this); // identifying correct delete button and storing it in var current
    current.closest($('.question-container')).remove(); // removing it's parent container
    repairQuestionIndeces(); // remapping question indeces
  })

  var reorderButton = $('.reorder-question');

  reorderButton.click(function(e) {
    e.preventDefault();
  })

  reorderButton.mousedown(reposition);

  //controls dynamic growth of multi-choice answer fields
  function grow() {
    var item = $(this); // identifying desired text input

    if (item.val() !== '' && item.next().val() === undefined) { // checks to make sure there is input && that there isnt already a next sibling
      var newInput = item.clone(true); // deep clones current input
      // newInput.keyup(grow);
      newInput.insertAfter(item); // inserts clone behind this input
      newInput.val(''); // removes copied val of clone daddy
      updateOptionIndeces(item.closest('.question-container'));
    }

    if (item.val() === '' && item.next().val() === '') { // checks if current && next input are empty
      item.next().remove(); // if so, it removes the next input
      updateOptionIndeces(item.closest('.question-container'));
    }

    item.on('blur', function() {
      if (item.val() === '' && item.next().val() !== undefined) { // if blurred input is empty and not the last in the list
        item.remove(); // then remove it
        updateOptionIndeces(item.closest('.question-container'));
      }
    })
  }

  // rewrites all question indeces in the current form, brute force FTW
  function repairQuestionIndeces() {
    var questArr = $('.actual').toArray(); // creates an array of all actual question containers

    for (var i = 0; i < questArr.length; ++i) { //for each actual question container...

      adjustAttrIndex($('.question-literal', questArr[i]), 'name', i) // change its question name
      adjustAttrIndex($('.type-select', questArr[i]), 'name', i) // change its select name

    }
  }

  function updateOptionIndeces(parent) {
    var optionArr = $('.mc-option', parent).toArray();

    for (var i = 0; i < optionArr.length; ++i) {
      var current = optionArr[i];
      adjustAttrIndex(current, 'name', i);
    }

  }

  //finds and replaces a number within an specified attribute within a specified jquery node object
  function adjustAttrIndex(targetNode, attribute, index) {
    var currentAttr = $(targetNode).attr(attribute); // identifies attribute with which we are concerned
    $(targetNode).attr(attribute, currentAttr.replace( /\d+/g, index)); // changes it using super sweet regex
  }

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
    //
    // var initialY = e.pageY;

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

});
