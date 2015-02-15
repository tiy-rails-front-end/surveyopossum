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
  var typeSelector = $('.type-select');
  var deleteButton = $('.delete-question');
  var mcOp = $('.mc-option');

  addButton.click(addQuestion);
  typeSelector.change(toggleMC);
  deleteButton.click(deleteQuestion);
  mcOp.keyup(grow);

  function addQuestion(e) {
    e.preventDefault();
    newQuestion.clone(true).insertAfter($('.actual').last());
    var newestQuestion = $('.actual').last();
    $('.question-literal', newestQuestion).val('');
    $('.type-select', newestQuestion).val('Question Type');

    if ($('.mc-option-box', newestQuestion).is(':visible')) {
      $('.mc-option', newestQuestion).first().nextAll().remove();
      $('.mc-option-box', newestQuestion).toggle();
    }

    repairQuestionindices();
  }

  function toggleMC(e) {
    var current = $(this);
    var mcOption = $('.mc-option', current.next());

    if (current.next().is(':hidden') && current.val() === 'Multiple Choice') {
      current.next().toggle();
      var questionIndex = current.attr('name').match(/\d+/);
      var optionName = mcOption.attr('name').replace(/\d+/, questionIndex);
      mcOption.attr('name', optionName);
    } else if (current.next().is(':visible') && current.val() !== 'Multiple Choice') {
      mcOption.nextAll().remove();
      mcOption.val('');
      current.next().toggle();
    }
  }

  function deleteQuestion(e) {
    e.preventDefault();
    var current = $(this);
    var parent = current.closest('.actual');
    if (parent.prev('.actual').length || parent.next('.actual').length) {
      current.closest($('.actual')).remove();
      repairQuestionindices();
    }
  }

  function grow() {
    var item = $(this);

    if (item.val() !== '' && item.next().val() === undefined) {
      var newInput = item.clone(true);
      newInput.insertAfter(item);
      newInput.val('');
      updateOptionindices(item.closest('.question-p'));
    }

    if (item.val() === '' && item.next().val() === '') {
      item.next().remove();
      updateOptionindices(item.closest('.question-p'));
    }

    item.on('blur', function() {
      if (item.val() === '' && item.next().val() !== undefined) {
        item.remove();
        updateOptionindices(item.closest('.question-p'));
      }
    })
  }

  function updateOptionindices(parent) {
    var optionArr = $('.mc-option', parent).toArray();

    for (var i = 0; i < optionArr.length; ++i) {
      var current = $(optionArr[i]);
      var newName = current.attr('name').replace(/\d+(?=\]\[name)/, i);
      current.attr('name', newName);
      var newID = current.attr('id').replace(/\d+(?=\]\[name)/, i);
      current.attr('id', newID);
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
