
const DATABASE_URL = `http://localhost:8080/file-posts`;

const classReferences = {
  create_a_blog_post_section: '.create-a-blog-post-section',
  update_blog_post_search_section: '.update-blog-post-search-section',
  get_a_blog_post_section: '.get-a-blog-post-section',
  delete_a_blog_post_section: '.delete-a-blog-post-section',
  update_blog_post_edit_section: '.update-blog-post-edit-section',
  results: '.results'
};

const addRemoveHideClass = (addHideArray, removeHideArray) => {
    addHideArray.forEach(ele => {
        $(ele).addClass('hide')
    })

    removeHideArray.forEach(ele => {
        $(ele).removeClass('hide')
    })
};

const getDataFromBlogPostApi = (searchTitle, callback) => {
    let query = {
        title: searchTitle
    };

    $.getJSON(DATABASE_URL, query, callback)
}

const postDataToBlogApi = (blogTitle, blogContent, callback) => {
    let settings = {
      url: DATABASE_URL,
      method: 'POST',
      data: {
          title: blogTitle,
          content: blogContent
        },
        success: callback
}

 console.log('post request')
  $.ajax(settings)
};

const displayBlogData = (data) => {
    if (data.length < 1) {
        $('.blog-title').text("Sorry there were no posts by that title")
        $('.blog-content').text("try another blog title")
        return
    }

    let resultTitle = `Blog Post Title: ${data[0].title}`;
    let resultContent = data[0].content;

    $('.blog-title').text(resultTitle);
    $('.blog-content').text(resultContent)
};

const displayNewPost = (data) => {
 console.log(data);
}

const displayPostForUpdate = (data) => {
    console.log(data)
  if (data.length < 1) {
      $('.post-to-update-blog-title').text("Sorry there were no posts by that title")
      $('.post-to-update-blog-content').text("try another blog title")
      return
  }

  let resultTitle = `Blog Post Title: ${data[0].title}`;
  let resultContent = data[0].content;

  $('.post-to-update-blog-title').text(resultTitle);
  $('.post-to-update-blog-content').text(resultContent)
}

const watchFoSearchForPostClick = () => {
  $('.get-blog-post-button').on('click', event => {
    event.preventDefault();

    let queryTitle = $('.search-field-for-get-blog-post').val();

    addRemoveHideClass([classReferences.create_a_blog_post_section, classReferences.delete_a_blog_post_section, classReferences.update_blog_post_search_section], [classReferences.results])
    getDataFromBlogPostApi(queryTitle, displayBlogData)

    $('.search-field-for-get-blog-post').val('');
  })
}

const watchForCreateNewPostClick = () => {
    $('.create-blog-post-button').on('click', event => {
      event.preventDefault();
      let blogTitle = $('.new-blog-post-title').val();
      let blogContent = $('.new-blog-post-content').val();

      addRemoveHideClass([classReferences.delete_a_blog_post_section, classReferences.update_a_blog_post_section, classReferences.get_a_blog_post_section], []);

      postDataToBlogApi(blogTitle, blogContent, displayNewPost);
    })
}

const watchForGetPostToUpdateClick = () => {
      $('.get-blog-post-for-update-button').on('click', event => {
        event.preventDefault();

        let queryTitle = $('.title-of-blog-post-to-update').val();
        addRemoveHideClass([classReferences.create_a_blog_post_section, classReferences.delete_a_blog_post_section, classReferences.update_blog_post_search_section, classReferences.get_a_blog_post_section], [classReferences.update_blog_post_edit_section])
        getDataFromBlogPostApi(queryTitle, displayPostForUpdate)
      })
}


const init = () => {
  watchFoSearchForPostClick()
  watchForCreateNewPostClick()
  watchForGetPostToUpdateClick()
};

$(init);
