// // الحصول على زر القائمة والقائمة
// const menuToggle = document.querySelector(".menu-toggle");
// const menu = document.querySelector("nav ul");

// // إضافة حدث النقر على زر القائمة
// menuToggle.addEventListener("click", () => {
//   // التبديل بين إظهار وإخفاء القائمة
//   menu.classList.toggle("show");
// });

function openPDF() {
  window.open("./Nemmy Platform.pdf", "_blank");
}



// قراءة البارامتر من الـ URL
function toggleSection() {

  var coursesSection = document.getElementById('Courses');
  var lessonsecSection = document.getElementById('lessonsec');
  
  // إخفاء قسم الدورات
  coursesSection.style.display = 'none';
  
  // إظهار قسم الدروس
  lessonsecSection.style.display = 'block';
}


function getSubjectFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("subject"); // ترجع اسم المادة
  }
  
  // تحديث المحتوى بناءً على المادة المختارة
  function updatePageContent() {
    const subject = getSubjectFromURL();
    if (!subject || !unitsData[subject]) return;
  
    const unitTitle = document.getElementById("unitTitle");
    const unitAccordion = document.getElementById("unitAccordion");
  
    // تحديث العنوان
    unitTitle.innerHTML = `<h3>${unitsData[subject].title}</h3>`;
  
    // تحديث الوحدات والدروس
    unitAccordion.innerHTML = unitsData[subject].units
      .map(
        (unit, index) => `
          <div class="accordion-item">
              <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                      data-bs-target="#collapse-${subject}-${index}" aria-expanded="false" 
                      aria-controls="collapse-${subject}-${index}">
                      ${unit.name}
                  </button>
              </h2>
              <div id="collapse-${subject}-${index}" class="accordion-collapse collapse" data-bs-parent="#unitAccordion">
                  ${unit.lessons
                    .map(
                      (lesson) =>
                        `<div class="accordion-body"><a href="javascript:void(0)" onclick="toggleSection()">${lesson.name}</a></div>`
                    )
                    .join("")}
              </div>
          </div>
      `
      )
      .join("");
  }
  
  // استدعاء الدالة عند تحميل الصفحة
  document.addEventListener("DOMContentLoaded", updatePageContent);
  