let username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem("username");

  if (username) {
      document.getElementById("user-name").textContent = username;
  } else {
      document.getElementById("user-name").textContent = "زائر";
  }
});


// Select the class bubble
time = document.getElementsByClassName('bubbles')[0];

let lastScrollY = 0;
window.addEventListener('scroll', function () {

    let value = window.scrollY; 
    text.style.top = 50 + value * -0.2 + '%';
    cloud.style.left = value * 2 + 'px';

    bird1.style.top = value * 0.1 + 'px';
    bird1.style.left = value * 1 + 'px';

    bird2.style.top = value * -0.1 + 'px';
    bird2.style.left = value * -2 + 'px';

    explore.style.marginTop = value * 1.5 + 'px';

    rocks.style.top = value * -0.14 + 'px';

    sky.style.top = value * 0.25 + 'px';
    mountains.style.top = value * 0.25 + 'px';


  

   
})
 // حفظ آخر مكان للسكرول لتحديد الاتجاه

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




gsap.to("path", {
    strokeDashoffset: 0,
    duration: 2,
    stagger: 0.3,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

gsap.to(".dashed-circle", {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 4,
    repeat: -1,
    ease: "linear"
});

window.onload=function(){
    $('.slider').slick({
    autoplay:true,
    autoplaySpeed:1500,
    arrows:true,
    prevArrow:'<button type="button" class="slick-prev"></button>',
    nextArrow:'<button type="button" class="slick-next"></button>',
    centerMode:true,
    slidesToShow:3,
    slidesToScroll:1
    });
  };


  $('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;
    
    function move(newIndex) {
      var animateLeft, slideLeft;
      
      advance();
      
      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }
      
      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');
      
      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }
      
      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }
    
    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }
    
    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });
    
    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });
    
    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');
      
      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
    
    advance();
  });
////////////////


function showUnits(subject) {
  const unitContent = document.getElementById('unitContent');
  const unitTitle = document.getElementById('unitTitle');
  const unitAccordion = document.getElementById('unitAccordion');

  // Hide the initial grid and show the unit content
  document.querySelector('.grid-container').style.display = 'none';
  unitContent.style.display = 'block';

  // Set the title of the subject
  unitTitle.innerHTML = `<h3>${unitsData[subject].title}</h3>`;

  // Create the accordion for the units and lessons
  unitAccordion.innerHTML = unitsData[subject].units.map((unit, index) => {
    return `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
            ${unit.name}
          </button>
        </h2>
        <div id="flush-collapse${index}" class="accordion-collapse collapse" data-bs-parent="#unitAccordion">
          ${unit.lessons.map(lesson => `<div class="accordion-body"><a href="#">${lesson}</a></div>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}
navbar=document.querySelector(".Categories")

window.addEventListener("DOMContentLoaded", function() {
  let header = document.getElementById("header");
  let button = document.getElementById("top");

  function updateHeader() {
      if (window.scrollY >300) {  
          header.classList.add("navchange");
          button.style.display = "block";
      } else {
          header.classList.remove("navchange");
          button.style.display = "none";
      }
  }

  updateHeader(); // حتى يطبق التأثير فورًا عند تحميل الصفحة
  window.addEventListener("scroll", updateHeader);
});
