$(document).ready(() => {
  // Initialize the form
  $("select").formSelect();

  // validates an email address
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // Handle the sign-up button click
  $("#sign-up").on("click", function (event) {
    event.preventDefault();

    // Grab data from the DOM
    const firstName = $("#first_name").val();
    const lastName = $("#last_name").val();
    const userName = $("#user_name").val();
    const email = $("#email").val();

    // check for blank fields
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === ""
    ) {
      $(".warning-fields").removeClass("hide");
      return;
    }

    // validate email
    if (!validateEmail(email)) {
      $(".warning-fields").addClass("hide");
      $(".warning-email").removeClass("hide");
      return;
    }

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
