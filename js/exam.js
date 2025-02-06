
window.onload = function () {
 alert("تحذير: إذا غادرت التبويب أو فتحت صفحة أخرى، سيتم إنهاء الامتحان!");
};

document.addEventListener("visibilitychange", function () {
 if (document.hidden) {
     window.location.href = "./test1.html"; // استبدلها بالصفحة المناسبة
 }
});


     function calculateScore() {
         let score = 0;
         const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
 
         // التحقق من إجابة جميع الأسئلة
         for (let q of questions) {
             if (!document.querySelector(`input[name="${q}"]:checked`)) {
                 alert("يرجى الإجابة على جميع الأسئلة قبل عرض النتيجة.");
                 return;
             }
         }
 
         // حساب الدرجات
         questions.forEach(q => {
             const selectedAnswer = document.querySelector(`input[name="${q}"]:checked`);
             if (selectedAnswer.value === 'correct') {
                 score++;
             }
         });
    
         // عرض النتيجة
         document.getElementById('result').innerText = `النتيجة: ${score} من 5`;
     }
