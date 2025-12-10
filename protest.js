// Импорт на Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.15.0/firebase-firestore.js";

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyBjzaSa6V7ZTJfeAQs2kkO8vsRC09L8PmY",
  authDomain: "protest-forum-692e3.firebaseapp.com",
  projectId: "protest-forum-692e3",
  storageBucket: "protest-forum-692e3.appspot.com",
  messagingSenderId: "42169973696",
  appId: "1:42169973696:web:7c908f2fdd32f0fbd36625"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM елементи
const postsDiv = document.getElementById("posts");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");
const submitBtn = document.getElementById("submitPost");

// Добавяне на нов пост
submitBtn.addEventListener("click", async () => {
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();

  if (!author || !content) return alert("Попълнете всички полета!");

  await addDoc(collection(db, "forumPosts"), {
    author,
    content,
    createdAt: new Date()
  });

  authorInput.value = "";
  contentInput.value = "";
});

// Показване на постове в реално време
const q = query(collection(db, "forumPosts"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  postsDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <div class="post-author">${post.author}</div>
      <div class="post-content">${post.content}</div>
    `;
    postsDiv.appendChild(div);
  });
});
