
let lastScrollY = 0; // حفظ آخر مكان للسكرول لتحديد الاتجاه

document.addEventListener("scroll", (event) => {
    const scrollY = window.scrollY;

    // حساب الاتجاه بناءً على الفرق بين السكرول الحالي والقديم
    const direction = scrollY > lastScrollY ? 1 : -1; // 1 لأسفل و -1 لأعلى

    lastScrollY = scrollY; // تحديث مكان السكرول الحالي

    // حساب زاوية التدوير بناءً على حركة السكرول
    const angle = scrollY / window.innerHeight * 360 * direction;

    // تحديد المسافة بين الأشكال
    const radius = 100;

    // تحديد الإحداثيات التي تتبع دائرة حول المركز
    const x1 = radius * Math.cos(angle * Math.PI / 180);
    const y1 = radius * Math.sin(angle * Math.PI / 180);

    const x2 = radius * Math.cos((angle + 120) * Math.PI / 180);
    const y2 = radius * Math.sin((angle + 120) * Math.PI / 180);

    const x3 = radius * Math.cos((angle + 240) * Math.PI / 180);
    const y3 = radius * Math.sin((angle + 240) * Math.PI / 180);

    // تحريك العناصر داخل الدائرة باستخدام GSAP
    gsap.to(".circle", {
        x: x1,
        y: y1,
        duration: 0.5
    });

    gsap.to(".square", {
        x: x2,
        y: y2,
        duration: 0.5
    });

    gsap.to(".triangle", {
        x: x3,
        y: y3,
        duration: 0.5
    });
});
