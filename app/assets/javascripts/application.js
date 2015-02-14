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
    newQuestion.insertBefore('.actions'); // inserts new question node before the submit button, aka last thing in form
    newQuestion.toggle(); // removes hidden attr from newly inserted node
    repairQuestionIndeces(); // rewrites indeces for all actual questions
    addButton.insertBefore('.actions'); // moves the add button to the appropriate position

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

  //controls dynamic growth of multi-choice answer fields
  function grow() {
    var item = $(this); // identifying desired text input

    if (item.val() !== '' && item.next().val() === undefined) { // checks to make sure there is input && that there isnt already a next sibling
      var newInput = item.clone(true); // deep clones current input
      // newInput.keyup(grow);
      newInput.insertAfter(item); // inserts clone behind this input
      newInput.val(''); // TODO: can't remember if this is actually necessary, but i'll check
    }

    if (item.val() === '' && item.next().val() === '') { // checks if current && next input are empty
      item.next().remove(); // if so, it removes the next input
    }

    item.on('blur', function() {
      if (item.val() === '' && item.next().val() !== undefined) { // if blurred input is empty and not the last in the list
        item.remove(); // then remove it
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

  //finds and replaces a number within an specified attribute within a specified jquery node object
  function adjustAttrIndex(targetNode, attribute, index) {
    var currentAttr = targetNode.attr(attribute); // identifies attribute with which we are concerned
    targetNode.attr(attribute, currentAttr.replace( /\d+/g, index)); // changes it using super sweet regex
  }

});
