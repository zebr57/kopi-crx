import confetti from "canvas-confetti";

confetti({
  particleCount: 200,
  spread: 180
});
document.querySelector(".read-btn").addEventListener("click", function (e) {
  window.open("https://shen-linqiang.gitee.io/blog-vitepress/frontend/kopi-crx/", "_blank");
});
