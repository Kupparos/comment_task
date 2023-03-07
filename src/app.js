let storeComments = JSON.parse(localStorage.getItem("comments")) || [];

document.addEventListener("DOMContentLoaded", function () {
  renderComments(storeComments);
});

let form = document.getElementById("comment-form");
let authorInput = document.getElementById("author");
let commentInput = document.getElementById("comment");
let dateInput = document.getElementById("date");

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addComment);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addComment();
});

[authorInput, commentInput].forEach((input) => {
  input.addEventListener("input", (event) => {
    if (event.key !== "Enter") {
      event.preventDefault();
      input.classList.remove("invalid");
      input.nextElementSibling.textContent = "";
    }
  });
});

dateInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addComment();
  }
});

function addComment() {
  let author = authorInput.value;
  let comment = commentInput.value;
  let date = dateInput.value || Date.now();
  let id = generateUUID();

  if (authorInput.value === "") {
    authorInput.classList.add("invalid");
    authorInput.nextElementSibling.textContent = "Не заполнено";
    return;
  }

  if (commentInput.value === "") {
    commentInput.classList.add("invalid");
    commentInput.nextElementSibling.textContent = "Не заполнено";
    return;
  }

  let newComment = {
    id: id,
    author: author,
    comment: comment,
    date: date,
    liked: false,
  };

  storeComments.push(newComment);

  authorInput.value = "";
  commentInput.value = "";
  dateInput.value = "";

  localStorage.setItem("comments", JSON.stringify(storeComments));
  renderComments(storeComments);
}

function renderComments(storeComments) {
   let commentsTitle = document.getElementById("comments_title");
   if (storeComments.length) {
      commentsTitle.innerHTML = 'Комментарии'
   }
   else {
      commentsTitle.innerHTML = 'Пока нет комментариев'
   }
  let commentsList = document.getElementById("comments");
  commentsList.innerHTML = "";
  for (let i = 0; i < storeComments.length; i++) {
    let commentItem = document.createElement("li");
    let commentAuthor = document.createElement("h4");
    let commentText = document.createElement("p");
    let commentDate = document.createElement("time");
    let likeButton = document.createElement("div");
    likeButton.classList.add("like");
    if (storeComments[i].liked) {
      likeButton.classList.add("liked");
    }
    let deleteButton = document.createElement("div");
    deleteButton.classList.add("delete");

    commentAuthor.innerText = storeComments[i].author;
    commentText.innerText = storeComments[i].comment;
    commentDate.innerText = formatDate(new Date(storeComments[i].date));
    likeButton.addEventListener("click", function () {
      storeComments[i].liked = !storeComments[i].liked;
      toggleLike(likeButton);
      localStorage.setItem("comments", JSON.stringify(storeComments));
    });
    deleteButton.addEventListener("click", function () {
      deleteComment(storeComments[i]);
      localStorage.setItem("comments", JSON.stringify(storeComments));
    });

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons_container");
    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(deleteButton);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info_container");
    infoContainer.appendChild(commentDate);
    infoContainer.appendChild(buttonsContainer);

    commentItem.appendChild(commentAuthor);
    commentItem.appendChild(commentText);
    commentItem.appendChild(infoContainer);
    commentsList.appendChild(commentItem);

    localStorage.setItem("comments", JSON.stringify(storeComments));
  }
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("liked");
}

function deleteComment(comment) {
  let index = storeComments.indexOf(comment);

  if (index > -1) {
    storeComments.splice(index, 1);

    renderComments(storeComments);
  }
}

function formatDate(date) {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { hour: "numeric", minute: "numeric" };

  if (date.toDateString() === now.toDateString()) {
    return `сегодня, ${date.toLocaleTimeString([], timeOptions)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `вчера, ${date.toLocaleTimeString([], timeOptions)}`;
  } else {
    return `${date.toLocaleDateString(
      [],
      dateOptions
    )}, ${date.toLocaleTimeString([], timeOptions)}`;
  }
}

function generateUUID() {
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
