document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem("username");
  document.getElementById("user-name").textContent = username ? username : "زائر";

  // إضافة Progress Bar تلقائيًا
  let progressContainer = document.createElement("div");
  progressContainer.className = "progress";
  progressContainer.style.width = "100%";
  progressContainer.style.background = "#e0e0e0";
  progressContainer.style.borderRadius = "5px";
  progressContainer.style.margin = "10px 0";

  let progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  progressBar.className = "progress-bar";
  progressBar.style.width = "0%";
  progressBar.style.height = "20px";
  progressBar.style.background = "#4caf50";
  progressBar.style.borderRadius = "5px";
  progressContainer.appendChild(progressBar);

  let progressText = document.createElement("p");
  progressText.id = "progressText";
  progressText.textContent = "التقدم: 0%";
  progressText.style.textAlign = "center";
  progressText.style.fontWeight = "bold";

  document.body.prepend(progressText);
  document.body.prepend(progressContainer);

  updatePageContent();
  updateProgress();
});

var coursesSection = document.getElementById("Courses");
var lessonsecSection = document.getElementById("lessonsec");

function openPDF(pdfUrl) {
  window.open(pdfUrl, "_blank");
}

function loadLesson(unitId, lessonId) {
  coursesSection.style.display = "none";
  lessonsecSection.style.display = "block";

  const subject = getSubjectFromURL();
  if (!subject || !unitsData[subject]) return;

  const unit = Object.values(unitsData[subject].units).find(u => u.id === unitId);
  const lesson = unit.lessons.find(l => l.id === lessonId);
  const container = document.getElementById("lessonContainer");

  container.innerHTML = `
      <div class="vid">
          <iframe style="width: 100%; aspect-ratio: 16/9; padding-bottom: 20px"
              src="${lesson.video}" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
          </iframe>
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

function toggleSectionBack() {
  coursesSection.style.display = "block";
  lessonsecSection.style.display = "none";

  const subject = getSubjectFromURL();
  if (!subject || !unitsData[subject]) return;

  const unitId = document.querySelector(".vid iframe").getAttribute("src");
  const unit = Object.values(unitsData[subject].units).find(u =>
      u.lessons.some(l => l.video === unitId)
  );
  if (!unit) return;

  const lesson = unit.lessons.find(l => l.video === unitId);
  if (!lesson) return;

  let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || {};

  if (!completedLessons[subject]) {
      completedLessons[subject] = [];
  }

  if (!completedLessons[subject].includes(lesson.id)) {
      completedLessons[subject].push(lesson.id);
  }

  localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  updateProgress();
}

function updateProgress() {
  const subject = getSubjectFromURL();
  if (!subject || !unitsData[subject]) return;

  let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || {};
  let completedCount = completedLessons[subject] ? completedLessons[subject].length : 0;

  let totalLessons = Object.values(unitsData[subject].units).reduce(
      (total, unit) => total + unit.lessons.length, 0
  );

  let progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  let progressBar = document.getElementById("progressBar");
  let progressText = document.getElementById("progressText");

  if (progressBar && progressText) {
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `التقدم: ${Math.round(progress)}%`;
  }
}

function getSubjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("subject");
}

function updatePageContent() {
  const subject = getSubjectFromURL();
  if (!subject || !unitsData[subject]) return;

  const unitTitle = document.getElementById("unitTitle");
  const unitAccordion = document.getElementById("unitAccordion");

  unitTitle.innerHTML = `<h3>${unitsData[subject].title}</h3>`;

  unitAccordion.innerHTML = unitsData[subject].units
      .map((unit, index) => `
          <div class="accordion-item">
              <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                      data-bs-target="#collapse-${subject}-${index}" aria-expanded="false" 
                      aria-controls="collapse-${subject}-${index}">
                      ${unit.name}
                  </button>
              </h2>
              <div id="collapse-${subject}-${index}" class="accordion-collapse collapse" data-bs-parent="#unitAccordion">
                  ${unit.lessons.map(lesson => `
                      <div class="accordion-body">
                          <a href="javascript:void(0)" onclick="loadLesson('${unit.id}', '${lesson.id}')">
                              ${lesson.name}
                          </a>
                      </div>
                  `).join("")}
              </div>
          </div>
      `)
      .join("");

  updateProgress();
}
