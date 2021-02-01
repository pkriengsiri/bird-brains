$(document).ready(() => {
  //get query parameters from the url
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get("page"));
  const results = parseInt(urlParams.get("results"));

  // get the number of elements in the table
  const elements = $(".query-data").data("elements");
  const pages = Math.ceil(elements / results);

  function renderPagination() {
    // render the pagination if the results > 0
    if (results > 0) {
      // render the <
      if (page === 1) {
        const chevronLeft = $("<li>")
          .addClass("disabled")
          .html(`<a href="#!"><i class="material-icons">chevron_left</i></a>`);
        $(".pagination").append(chevronLeft);
      } else {
        const lastPage = page - 1;
        const chevronLeft = $("<li>")
          .addClass("waves-effect")
          .html(
            `<a href="?page=${lastPage}&results=${results}"><i class="material-icons">chevron_left</i></a>`
          );
        $(".pagination").append(chevronLeft);
      }

      // render the page #s
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          const pageNumber = $("<li>")
            .addClass("active")
            .html(`<a href="?page=${i}&results=${results}">${i}</a></li>`);
          $(".pagination").append(pageNumber);
        } else {
          const pageNumber = $("<li>")
            .addClass("waves-effect")
            .html(`<a href="?page=${i}&results=${results}">${i}</a></li>`);
          $(".pagination").append(pageNumber);
        }
      }
    }

    //render the >

  }

  renderPagination();
});
