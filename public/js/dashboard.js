let newPostBtn = document.getElementById("newBlogPostBtn");
let newBlogPost = document.getElementById("newBlogPost");
let newPostSaveBtn = document.getElementById("newPostSaveBtn")


newPostBtn.addEventListener("click", () => {
    newPostBtn.setAttribute("class", "hide");
    newBlogPost.removeAttribute("class")
    newPostSaveBtn.removeAttribute("class")
   
})

newPostSaveBtn.addEventListener("click", () => {
    newBlogPost.value
    newBlogPost.value = "New blog post..."
    newBlogPost.setAttribute("class", "hide")
    newPostSaveBtn.setAttribute("class", "hide")
    newPostBtn.removeAttribute("class")
    
})