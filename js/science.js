// قراءة البارامتر من الـ URL
function getSubjectFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('subject'); // ترجع اسم المادة
}

// تحديث المحتوى بناءً على المادة المختارة
function updatePageContent() {
    const subject = getSubjectFromURL();
    if (!subject || !unitsData[subject]) return;

    const unitTitle = document.getElementById('unitTitle');
    const unitAccordion = document.getElementById('unitAccordion');

    // تحديث العنوان
    unitTitle.innerHTML = `<h3>${unitsData[subject].title}</h3>`;

    // تحديث الوحدات والدروس
    unitAccordion.innerHTML = unitsData[subject].units.map((unit, index) => `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#flush-collapse${index}" aria-expanded="false" 
                    aria-controls="flush-collapse${index}">
                    ${unit.name}
                </button>
            </h2>
            <div id="flush-collapse${index}" class="accordion-collapse collapse" data-bs-parent="#unitAccordion">
                ${unit.lessons.map(lesson => `<div class="accordion-body"><a href="#">${lesson}</a></div>`).join('')}
            </div>
        </div>
    `).join('');
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updatePageContent);
