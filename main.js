var container = $('.container');
var form = $('form');
//make new item
function savePost(form) {
  var post = {
    listItem: form.find('.todo-item').val()
  };
var li = $('<li class="list-item">' + post.listItem + '</li>');
var button = $('<button class="delete" type="button">Delete</button>');
container.append(li, button);

//line-through attempt
//cross out item
li.on('click', function(e) {
  li.css({'text-decoration': 'line-through'});
});
li.on('dblclick', function(e) {
  li.css('text-decoration', 'none');
});

  var settings = {
    url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/',
    type: 'POST',
    success: function(data, status, xhr) {


    },
    error: function () {
      console.log('the post didnt work');
    },
    contentType: 'application/json',
    data: JSON.stringify(post)
  };
  $.ajax(settings);

}

/////////runtime below:
//put new item in list
var settings = {
  url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/',
  type: 'GET',
  success: function(data, status, xhr) {
    data.forEach(function(list, i, arr) {
      var li = $('<li class="list-item">'+list.listItem+'</li>');
      var button = $('<button class="delete" type="button">Delete</button>');
//cross out item
li.on('click', function(e) {
  li.css({'text-decoration': 'line-through'});
});
li.on('dblclick', function(e) {
  li.css('text-decoration', 'none');
});




      button.on('click', function(e) {
        var settings = {
          url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/'+list._id,
          type: 'DELETE',
          success: function(data, status, xhr) {
            console.log('deleted it!');
            li.remove();
          },
          error: function() {
            console.log('delete didnt work');
          }

        };
        $.ajax(settings);
      });
      container.append(li, button);
    });
}};
$.ajax(settings);

form.find('.submit').on('click', function(e) {
  e.preventDefault();
  savePost(form);
});
