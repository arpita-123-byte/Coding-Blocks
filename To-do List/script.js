$(document).ready(function() {
  $('#addTask').click(function() {
    const task = $('#taskInput').val().trim();
    if (task !== '') {
      const newItem = $('<li></li>').text(task);
      const deleteBtn = $('<span class="delete">✖</span>');
      newItem.append(deleteBtn);
      $('#taskList').append(newItem);
      $('#taskInput').val('');
    }
  });

  // Mark task complete
  $('#taskList').on('click', 'li', function(e) {
    if (!$(e.target).hasClass('delete')) {
      $(this).toggleClass('completed');
    }
  });

  // Delete task
  $('#taskList').on('click', '.delete', function(e) {
    $(this).parent().remove();
    e.stopPropagation(); // prevent li click
  });
});
