let username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem("username");

  if (username) {
      document.getElementById("user-name").textContent = username;
  } else {
      document.getElementById("user-name").textContent = "زائر";
  }
});


var coursesSection = document.getElementById("Courses");
var lessonsecSection = document.getElementById("lessonsec");

function openPDF(pdfUrl) {
  window.open(pdfUrl, "_blank");
}
function loadLesson(unitId, lessonId) {
  coursesSection.style.display = "none"; // إخفاء قسم المواد
  lessonsecSection.style.display = "block"; // إظهار قسم الدروس

  // جلب اسم المادة من الرابط
  const subject = getSubjectFromURL();
  if (!subject || !unitsData[subject]) return;

  // البحث في جميع المواد للوصول إلى الوحدة المطلوبة
  const unit = Object.values(unitsData[subject].units).find(
    (u) => u.id === unitId
  );

  // البحث عن الدرس داخل الوحدة
  const lesson = unit.lessons.find((l) => l.id === lessonId);
  const container = document.getElementById("lessonContainer");

  // إضافة المحتوى داخل الحاوية
  container.innerHTML = `
    <div class="vid">
      <iframe
        style="width: 100%; aspect-ratio: 16/9; padding-bottom: 20px"
        src="${lesson.video}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope;"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div class="bttncon">
        <span>${unitsData[subject].title} - ${unit.name} - ${lesson.name}</span>
        <div class="bcon" style="display: flex; flex-direction: column;">
<button type="submit" class="btn b" onclick="openPDF('${lesson.pdf}')">عرض الملف</button>
          <a href="javascript:void(0)" onclick="toggleSectionBack()">
            <button type="submit" class="btn b">انهي الدرس</button>
          </a>
        </div>
      </div>
    </div>
  `;
}

// زر الرجوع
function toggleSectionBack() {
  coursesSection.style.display = "block";
  lessonsecSection.style.display = "none";
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
                `<div class="accordion-body"><a href="javascript:void(0)" onclick="loadLesson('${unit.id}', '${lesson.id}')">${lesson.name}</a></div>`
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");
}

function openPDF(pdfUrl) {
  window.open(pdfUrl, "_blank");
}


// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", updatePageContent);
