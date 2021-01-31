$(document).ready(() => {
  $("select").formSelect();
  let imageURL = "";
  const oldPoints = $("#bird_select :selected").data("points");

  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "djou7v3ho",
      uploadPreset: "krrvtotm",
    },
    function (error, result) {
      console.log(result.event);
      if (!error && result && result.event === "success") {
        $("#successMessage").removeClass("hide");
        console.log("Done! Here is the image info: ", result.info);
        imageURL = result.info.url;
        $("#uploaded-image").empty();
        const image = $("<img>")
          .attr("src", imageURL)
          .addClass("responsive-img z-depth-3");
        $("#uploaded-image").append(image);
        console.log(imageURL);
      } else if (!result.event) {
        $("#failMessage").removeClass("hide");
        console.log(error);
      }
    }
  );

  $("#update").on("click", function (event) {
    event.preventDefault();
    const id = $("#sighting-id").data("id");
    const UserId = $("#user_select").val();
    const BirdId = $("#bird_select").val();
    const location = $("#location").val();
    const comments = $("#comments").val();
    const data = {
      location: location,
      comments: comments,
      image_URL: imageURL,
      BirdId: BirdId,
      UserId: UserId,
    };

    $.ajax({
      method: "PUT",
      url: `/api/sightings/${id}`,
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get old user score
    let score = $("#user_select :selected").data("score");
    // Subtract the points from the previous bird
    score = score - oldPoints;
    // Get points for new bird
    const points = $("#bird_select :selected").data("points");
    console.log("points: "+points+" oldpoints: "+oldPoints);
    // Add new bird points to score
    const newScore = points + score;
    console.log(newScore);

    $.ajax({
      method: "PUT",
      url: "/api/users/" + UserId,
      data: { score: newScore },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  document.getElementById("upload_widget").addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      myWidget.open();
    },
    false
  );
});
