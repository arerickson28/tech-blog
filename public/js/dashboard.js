let newPostBtn = document.getElementById("newBlogPostBtn");
let newBlogPost = document.getElementById("newBlogPost");
let newPostTitle = document.getElementById("newPostTitle")
let newPostSaveBtn = document.getElementById("newPostSaveBtn")
let newPostCancelBtn = document.getElementById("cancelNewPost")


newPostBtn.addEventListener("click", () => {
    newPostBtn.setAttribute("class", "hide");
    newPostTitle.removeAttribute("class")
    newBlogPost.removeAttribute("class")
    newPostSaveBtn.removeAttribute("class")
    newPostCancelBtn.removeAttribute("class")
   
})

newPostSaveBtn.addEventListener("click", async () => {
    let title = newPostTitle.value.trim()
    let content = newBlogPost.value.trim()

    console.log(title, content)

    if (title && content) {
        console.log(title, content)
        const response = await fetch(`/api/posts/`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create blog post');
        }
      }

    newPostTitle.value = ""
    newBlogPost.value = ""

    newPostTitle.setAttribute("class", "hide")
    newBlogPost.setAttribute("class", "hide")
    newPostSaveBtn.setAttribute("class", "hide")
    newPostCancelBtn.setAttribute("class", "hide")
    newPostBtn.removeAttribute("class");


    
})

newPostCancelBtn.addEventListener("click", () => {
    newPostTitle.value = ""
    newBlogPost.value = ""

    newPostTitle.setAttribute("class", "hide")
    newBlogPost.setAttribute("class", "hide")
    newPostSaveBtn.setAttribute("class", "hide")
    newPostCancelBtn.setAttribute("class", "hide")
    newPostBtn.removeAttribute("class");
})