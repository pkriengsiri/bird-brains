$(document).ready(() => {
  console.log("Hello world");
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
    function () {
      myWidget.open();
    },
    false
  );

  //   const url =
  //     "https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/djou7v3ho/upload";

  //   //   const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  //   const form = document.querySelector("form");

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     const files = document.querySelector("[type=file]").files;
  //     const formData = new FormData();

  //     for (let i = 0; i < files.length; i++) {
  //       let file = files[i];
  //       formData.append("file", file);
  //       formData.append("upload_preset", "docs_upload_example_us_preset");

  //       fetch(url, {
  //         method: "POST",
  //         body: formData,
  //       })
  //         .then((response) => {
  //           return response.text();
  //         })
  //         .then((data) => {
  //           document.getElementById("data").innerHTML += data;
  //         });
  //     }
  //   });

  //   const processUpload = function () {
  //     const files = $("#image-file")[0].files;
  //     const formData = new FormData();

  //     for (let i = 0; i < files.length; i++) {
  //       let file = files[i];
  //       formData.append("file", file);
  //       formData.append("upload_preset", "docs_upload_example_us_preset");
  //       console.log(formData);

  //       fetch(url, {
  //         method: "POST",
  //         body: formData,
  //       })
  //         .then((response) => {
  //           console.log(response);
  //           return response.text();
  //         })
  //         .then((data) => {
  //           console.log(data);
  //         });
  //     }
  //   };

  //   const processUpload = function () {
  //     const file = $("#image-file")[0].files[0];

  //     const file2 = new FormData($('form')[0]);

  //     $.ajax({
  //       // Your server script to process the upload
  //       url: "/api/image",
  //       type: "POST",

  //       // Form data
  //       //   data: new FormData($("form")[0]),
  //       data: file,

  //       // Tell jQuery not to process data or worry about content-type
  //       // You *must* include these options!
  //       cache: false,
  //       contentType: false,
  //       processData: false,

  //       // Custom XMLHttpRequest
  //       xhr: function () {
  //         var myXhr = $.ajaxSettings.xhr();
  //         if (myXhr.upload) {
  //           // For handling the progress of the upload
  //           myXhr.upload.addEventListener(
  //             "progress",
  //             function (e) {
  //               if (e.lengthComputable) {
  //                 $("progress").attr({
  //                   value: e.loaded,
  //                   max: e.total,
  //                 });
  //               }
  //             },
  //             false
  //           );
  //         }
  //         return myXhr;
  //       },
  //     });
  //   };

  //   $("#upload").on("click", processUpload);
});
