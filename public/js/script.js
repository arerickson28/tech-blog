let commentBtns = document.getElementsByClassName("commentBtn")

let commentDiv = document.createElement("div")
commentDiv.setAttribute("class", "post")

let commentTitle = document.createElement("input")
commentTitle.setAttribute("class", "commentTitle")
commentTitle.setAttribute("placeholder", "New Comment Title...")

let commentContent = document.createElement("textarea")
commentContent.setAttribute("class", "commentContent")
commentContent.setAttribute("placeholder", "New Comment Content...")

let commentBtnsDiv = document.createElement("div")

let saveCommentBtn = document.createElement("button");
saveCommentBtn.textContent = "Save"

let cancelCommentBtn = document.createElement("button")
cancelCommentBtn.textContent = "cancel"

commentBtnsDiv.appendChild(saveCommentBtn)
commentBtnsDiv.appendChild(cancelCommentBtn)

commentDiv.appendChild(commentTitle)
commentDiv.appendChild(commentContent)
commentDiv.appendChild(commentBtnsDiv)

cancelCommentBtn.addEventListener("click", () => {
    event.target.parentNode.parentNode.previousSibling.previousSibling.classList.remove("hide")
    event.target.parentNode.parentNode.parentNode.removeChild(commentDiv)
})


for (let i=0; i < commentBtns.length; i++) {
    commentBtns[i].addEventListener("click", async () => {
        event.preventDefault()
        postId = event.target.parentNode.getAttribute("value")
        event.target.classList.add("hide")
        event.target.parentNode.appendChild(commentDiv)
    })
  }