var container = $('.container');

function getList(){
  //retrieving list items
$.ajax({
  url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/',
  type: 'GET',
  success: function(response){
    response.forEach(function(item, i, arr){
      var li = $('<li class="list-item">'+item.description+'</li>');
      var button = $('<input type="button" id="delete" value="delete"/>');
      container.append(li);
      li.append(button);
      // implementing delete function
      button.on('click', function(e){
        $.ajax({
          url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/'+item._id,
          type: 'DELETE',
          success: function(response){
            li.remove();
          },
          error: function(){
            console.log('error with delete');
          }
        });
      });
    });
  }
});
}
function newListItem(){
  var item = {
    description: $('.todo-item').val(),
  };
  $.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(item),
    success: function(response){
      getList();
    }
  });
}
getList();
function clearInput(){
  document.querySelector('.todo-item').value = '';
}
  $('.submit').on('click', function(e){
    e.preventDefault();
    container.empty();
    newListItem();
    clearInput();
  });
