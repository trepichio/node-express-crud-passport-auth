$(document).ready(function () {
  $('.delete-article').on('click', function (e) {
    $target = $(e.target);

    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: `/articles/${id}`,
      success: function (response) {
        // alert(`Deleting article ${id}`)
        window.location.href = '/articles'
      },
      error: function (err) {
        console.log(err.statusText);
      }
    })
  })

  $('.delete-user').on('click', function (e) {
    $target = $(e.target);

    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: `/users/${id}`,
      success: function (response) {
        // alert(`Deleting user ${id}`)
        window.location.href = '/users'
      },
      error: function (err) {
        console.log(err.statusText);
      }
    })
  })

});