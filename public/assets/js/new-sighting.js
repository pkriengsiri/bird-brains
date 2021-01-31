$(document).ready(() => {
  $("select").formSelect();
  let imageURL = "";

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
        
        console.log(imageURL);
      } else if (!result.event) {
        $("#failMessage").removeClass("hide");
        console.log(error);
      }
    }
  );

  document.getElementById("upload_widget").addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      myWidget.open();
    },
    false
  );

});
