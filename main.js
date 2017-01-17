var container = $('.container');
var complete = $('.complete');
var incomplete = $('.incomplete');

function getList(){
  complete.empty();
  incomplete.empty();
  //retrieving list items
$.ajax({
  url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/',
  type: 'GET',
  success: function(response){
    response.forEach(function(item, i, arr){
      var completeLi;
      var incompleteLi;
      var button = $('<input type="button" id="delete" value="delete"/>');
      if(item.completed==='true'){
        completeLi = $('<li class="complete-item">'+item.description+'</li>');
        complete.append(completeLi);
        completeLi.append(button);
        completeLi.on('click', function(e){
          $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/'+item._id,
            type: 'PUT',
            data: 'completed=false',
            success: function(response){
              getList();
            }
          });
        });
      } else {
        incompleteLi = $('<li class="incomplete-item">'+item.description+'</li>');
        incomplete.append(incompleteLi);
        incompleteLi.append(button);
        incompleteLi.on('click', function(e){
          $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/'+item._id,
            type: 'PUT',
            data: 'completed=true',
            success: function(response){
              getList();
            }
          });
        });
      }
      // implementing delete function
      button.on('click', function(e){
        $.ajax({
          url: 'http://tiny-za-server.herokuapp.com/collections/todo_list/'+item._id,
          type: 'DELETE',
          success: function(response){
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
    completed: 'false'
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
    complete.empty();
    incomplete.empty();
    newListItem();
    clearInput();
  });
