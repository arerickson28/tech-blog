let newPostBtn = document.getElementById("newBlogPostBtn");
let newBlogPost = document.getElementById("newBlogPost");
let newPostTitle = document.getElementById("newPostTitle")
let newPostSaveBtn = document.getElementById("newPostSaveBtn")
let newPostCancelBtn = document.getElementById("cancelNewPost")
let editBtns = document.getElementsByClassName("editBtn");
let deleteBtn = document.getElementsByClassName("deleteBtn")



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

for (let i=0; i < editBtns.length; i++) {
  editBtns[i].addEventListener("click", () => {
    event.preventDefault()
    let post = event.target.parentNode.previousElementSibling
    let postTitle = post.childNodes[1].childNodes[1].innerHTML
    let postContent = post.childNodes[3].childNodes[1].innerHTML
    console.log(postContent)
    let postId = event.target.parentNode.previousElementSibling.getAttribute("value")
    console.log(postId)
    post.classList.add("hide")

    let editPost = document.createElement("div")
    editPost.setAttribute("class", "post")

    let editInput = document.createElement("input")
    editInput.setAttribute("id", "editPostTitle")
    editInput.setAttribute("placeholder", postTitle)

    let editTextarea = document.createElement("textarea")
    editTextarea.setAttribute("id", "editBlogPost")
    editTextarea.setAttribute("placeholder", postContent)

    let editBtnsDiv = document.createElement("div")

    let editSaveBtn = document.createElement("button")
    editSaveBtn.setAttribute("id", "editPostSaveBtn")
    editSaveBtn.textContent = "Save"

    let cancelSaveBtn = document.createElement("button")
    cancelSaveBtn.setAttribute("id", "cancelEditPost")
    cancelSaveBtn.textContent = "Cancel"

   editBtnsDiv.appendChild(editSaveBtn)
   editBtnsDiv.appendChild(cancelSaveBtn)

   editPost.appendChild(editInput)
   editPost.appendChild(editTextarea)
   editPost.appendChild(editBtnsDiv)
   console.log(post)
   console.log(editPost)

   post.parentNode.insertBefore(editPost, post.nextSibling)
   event.target.parentNode.setAttribute("class", "hide")

  //  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  
  })
}

