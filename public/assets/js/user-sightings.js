$(document).ready(() => {
  $("select").formSelect();

  const score = $("#user_select :selected").data("score");
  const points = $("#bird_select :selected").data("points");
  const newScore = score - points;
  console.log(newScore);

  $(".delete-sighting").on("click", function (event) {
    event.preventDefault();
    console.log(this);
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/sightings/" + id, {
      type: "DELETE",
    })
      .then(function (res) {
        console.log(res);
        console.log("deleted sighting", id);
        // Reload the page to get the updated list
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
