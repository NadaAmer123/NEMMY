
// الحصول على زر القائمة والقائمة
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

// إضافة حدث النقر على زر القائمة
menuToggle.addEventListener("click", () => {
  // التبديل بين إظهار وإخفاء القائمة
  menu.classList.toggle("show");
});

function openPDF() {
  window.open("./Nemmy Platform.pdf", "_blank");
}
