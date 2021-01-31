$(document).ready(() => {
  $("select").formSelect();
  let imageURL = "";
  // var instance = M.FormSelect.getInstance(elem);

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
          .addClass("responsive-img");
        $("#uploaded-image").append(image);
        console.log(imageURL);
      } else if (!result.event) {
        $("#failMessage").removeClass("hide");
        console.log(error);
      }
    }
  );

  $("#submit").on("click", function (event) {
    event.preventDefault();
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
    $.post("/api/sightings", data)
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
