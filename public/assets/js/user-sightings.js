$(document).ready(() => {
  $("select").formSelect();

  $(".delete-sighting").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/sightings/" + id, {
      type: "DELETE",
    })
      .then(function () {
        console.log("deleted sighting", id);
        // Reload the page to get the updated list
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
