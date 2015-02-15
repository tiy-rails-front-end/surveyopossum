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
  $('.question-container').first().addClass('blueprint');

  addButton.click(function(e) {
    e.preventDefault();
    newQuestion.clone(true).insertAfter($('.actual').last());
    var newestQuestion = $('.actual').last();
    $('.question-literal', newestQuestion).val('');
    $('.type-select', newestQuestion).val('Question Type');

    if ($('.mc-option-box', newestQuestion).is(':visible')) {
      $('.mc-option', newestQuestion).first().nextAll().remove();
      $('.mc-option-box', newestQuestion).toggle();
    }

    repairQuestionIndeces();

  })

  var typeSelector = $('.type-select');

  typeSelector.change(function(e) {
    var current = $(this);
    var mcOption = $('.mc-option', current.next());

    if (current.next().is(':hidden') && current.val() === 'Multiple Choice') {
      current.next().toggle();
      var questionIndex = current.attr('name').match(/\d+/);
      var optionName = mcOption.attr('name').replace(/\d+/, questionIndex);
      mcOption.attr('name', optionName);
      mcOption.keyup(grow);
    } else if (current.next().is(':visible') && current.val() !== 'Multiple Choice') {
      mcOption.nextAll().remove();
      mcOption.val('');
      current.next().toggle();
    }
  })

  var deleteButton = $('.delete-question');

  deleteButton.click(function(e) {
    e.preventDefault();
    var current = $(this); // identifying correct delete button and storing it in var current
    var parent = current.closest('.actual');
    if (parent.prev('.actual').length || parent.next('.actual').length) {
      current.closest($('.actual')).remove(); // removing it's parent container
      repairQuestionIndeces(); // remapping question indeces
    }
  })

  //controls dynamic growth of multi-choice answer fields
  function grow() {
    var item = $(this); // identifying desired text input

    if (item.val() !== '' && item.next().val() === undefined) { // checks to make sure there is input && that there isnt already a next sibling
      var newInput = item.clone(true); // deep clones current input
      newInput.insertAfter(item); // inserts clone behind this input
      newInput.val(''); // removes copied val of clone daddy
      updateOptionIndeces(item.closest('.question-p'));
    }

    if (item.val() === '' && item.next().val() === '') { // checks if current && next input are empty
      item.next().remove(); // if so, it removes the next input
      updateOptionIndeces(item.closest('.question-p'));
    }

    item.on('blur', function() {
      if (item.val() === '' && item.next().val() !== undefined) { // if blurred input is empty and not the last in the list
        item.remove(); // then remove it
        updateOptionIndeces(item.closest('.question-p'));
      }
    })
  }

  function updateOptionIndeces(parent) {
    var optionArr = $('.mc-option', parent).toArray();

    for (var i = 0; i < optionArr.length; ++i) {
      var current = $(optionArr[i]);
      var newName = current.attr('name').replace(/\d+(?=\]\[name)/, i);
      current.attr('name', newName);
      var newID = current.attr('id').replace(/\d+(?=\]\[name)/, i);
      current.attr('id', newID);
    }

  }

  function repairQuestionIndeces() {
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

  $('form').submit(function(e) {
    var selectArr = $('.type-select').toArray();

    for (var i = 0; i < selectArr.length; ++i) {
      if ($(selectArr[i]).val() === 'Question Type') {
        e.preventDefault();
        alert('please select a question type for all questions');
        return;
      }
    }
  })

  var newQuestion = $('.actual').first().clone(true);

});
