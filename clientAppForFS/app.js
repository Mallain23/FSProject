
const DATABASE_URL = `http://localhost:8080/file-posts`;

const getDataFromBlogPostApi = (queryTitle, callback) => {
  let query = {
    title: queryTitle
  };
  $.getJSON(DATABASE_URL, query, callback)

}

const getRequestBlogData = (data) => {
  console.log(data)
  $('.results').html(data)
}

const watchForGetRequest = () => {
  $(".get-blog-post").on("click", event => {
    event.preventDefault();
    let queryTitle = $('.search-field-for-get-blog-post').val();
    getDataFromBlogPostApi(queryTitle, getRequestBlogData)
  })
}

const init = () => {
  watchForGetRequest()
};

$(init);
