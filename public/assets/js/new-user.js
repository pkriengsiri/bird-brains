$(document).ready(() => {
  // Initialize the form
  $("select").formSelect();

  // Handle the sign-up button click
  $("#sign-up").on("click", function (event) {
    event.preventDefault();
    // Grab data from the DOM
    const firstName = $("#first_name").val();
    const lastName = $("#last_name").val();
    const userName = $("#user_name").val();
    const email = $("#email").val();

    const data = {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email: email,
    };

    // Post to /api/users
    $.post("/api/users", data)
      .then((response) => {
        console.log(response);
        window.location.replace(`/users/${response.id}`);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  });
});
