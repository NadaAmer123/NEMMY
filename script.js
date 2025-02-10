document.addEventListener("DOMContentLoaded", function() {
    let storedUsername = localStorage.getItem("username");
document.getElementById("student-name").textContent = storedUsername || "غير متوفر";
//   let courseName = " الحضارة المصرية القديمة وعالقتها بحضارات إفريقيا"; // يمكنك التعديل حسب الدورة المناسبة
  
//   document.getElementById("course-name").innerText = courseName;

  // إضافة التاريخ الحالي
  let today = new Date().toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
  document.getElementById("date").innerText = today;

  document.getElementById("download-btn").addEventListener("click", function() {
      const { jsPDF } = window.jspdf || {};
      if (!jsPDF) {
          console.error("jsPDF غير متوفر! تأكد من تحميل المكتبة.");
          return;
      }

      html2canvas(document.getElementById("certificate"), { scale: 2 }).then(canvas => {
          let imgData = canvas.toDataURL("image/png");
          let pdf = new jsPDF("l", "mm", "a4");
          let width = pdf.internal.pageSize.getWidth();
          let height = (canvas.height * width) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 10, width, height);
          pdf.save("certificate.pdf");
      }).catch(error => {
          console.error("حدث خطأ أثناء إنشاء الـ PDF:", error);
      });
  });
});
