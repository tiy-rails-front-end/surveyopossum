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

  addButton.on('click', function(e) {
    e.preventDefault();
    var newQuestion = $('.blueprint').clone(true);
    newQuestion.removeClass('blueprint');
    newQuestion.insertBefore('.actions');
    newQuestion.toggle();
    addButton.insertBefore('.actions');
  })

  var typeSelector = $('.type-select');

  typeSelector.change(function(e) {
    var current = $(this);
    if (current.val() === 'Multiple Choice') {
      var mcOption = $('.root').clone();
      mcOption.removeClass('root');
      $(current).closest($('.question-p')).append(mcOption);
      mcOption.keyup(grow);
    }
  })

  var deleteButton = $('.delete-question');

  deleteButton.click(function(e) {
    var current = $(this);
    current.closest($('.question-container')).remove();
  })

  function grow() {
    var item = $(this);

    if (item.val() !== '' && item.next().val() === undefined) {
      var newInput = item.clone();
      newInput.keyup(grow);
      newInput.insertAfter(item);
      newInput.val('');
    }

    if (item.val() === '' && item.next().val() === '') {
      item.next().remove();
    }

    item.on('blur', function() {
      if (item.val() === '' && item.next().val() !== undefined) {
        item.remove();
      }
    })
  }

});
