$(document).ready(function () {
console.log("hello world");

  $(".bird-btn").on("click", function () {
    console.log("Button clicked");
    var id = $(this).data("id");
    console.log(id);

  //   $.ajax({
  //     method: "GET",
  //     url: "/api/birds/:id",
  //     data: id,
  //   }).then(function () {
      window.location.href = `/birds/${id}`;
  //   });
  // });

  // // var id = $(this).data("id");

  // $.get("/api/birds/:id", id);
});
});

//   router.get("/birds/:id", (req, res) => {
//     db.Bird.findOne({
//       where: { id: req.params.id },
//     })
//       .then((singleBird) => {
//         res.render("single-Bird", singleBird.dataValues);
//       })
//       .catch((err) => {
//         console.log(err);
//         //TODO: render 404 page if we're unable to return birds
//         res.status(500).end();
//       });
//   });
// });
