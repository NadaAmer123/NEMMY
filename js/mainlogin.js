localStorage.clear();
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input, select").forEach(input => {
        let storedValue = localStorage.getItem(input.name);
        if (storedValue) {
            input.value = storedValue;
        }
    });
});

// دالة التحقق وتخزين البيانات
function validateForm(event, formType) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    let emailField, passwordField, parentEmailField, usernameField, yearField;
    
    if (formType === 'register') {
        emailField = document.getElementById('student-id');
        parentEmailField = document.getElementById('parent-id');
        passwordField = document.getElementById('password1');
        usernameField = document.getElementById('username');
        yearField = document.getElementById('year');
    } else if (formType === 'login') {
        emailField = document.getElementById('login-email');
        parentEmailField = document.getElementById('login-parent-id');
        passwordField = document.getElementById('password2');
    }

    if (!emailField.value || !emailRegex.test(emailField.value)) {
        alert("من فضلك أدخل بريد إلكتروني صحيح.");
        event.preventDefault();
        return false;
    }

    if (!parentEmailField.value || !emailRegex.test(parentEmailField.value)) {
        alert("من فضلك أدخل بريد إلكتروني صحيح للوالد.");
        event.preventDefault();
        return false;
    }

    if (!passwordField.value || passwordField.value.length < 8) {
        alert("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
        event.preventDefault();
        return false;
    }

    if (formType === 'register') {
        localStorage.setItem("student-id", emailField.value);
        localStorage.setItem("parent-id", parentEmailField.value);
        localStorage.setItem("username", usernameField.value);
        localStorage.setItem("year", yearField.value);
    } else if (formType === 'login') {
        localStorage.setItem("student-id", emailField.value);
        localStorage.setItem("parent-id", parentEmailField.value);
    }

    event.preventDefault();
    window.location.href = "./test1.html";
    return true;
}

if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(event) {
        return validateForm(event, 'register');
    });
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        return validateForm(event, 'login');
    });
}

window.onload = function() {
    const registerBtn = document.querySelector('.register');
    if (registerBtn) registerBtn.style.backgroundColor = 'rgb(240, 39, 0)';
};

let moveEyesWithMouse = true;
let eyesFixedLeft = false;

function moveEyesLeft() {
    document.querySelectorAll(".pupil").forEach(pupil => {
        pupil.style.transform = "translate(-8px, 0)";  
    });
}

document.addEventListener("mousemove", (event) => {
    if (moveEyesWithMouse) {
        document.querySelectorAll(".eye").forEach(eye => {
            const pupil = eye.querySelector(".pupil");
            const rect = eye.getBoundingClientRect();
            const angle = Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
            pupil.style.transform = `translate(${Math.cos(angle) * 5}px, ${Math.sin(angle) * 5}px)`;
        });
    }
});

document.querySelectorAll('.op').forEach((eyeIcon, index) => {
    eyeIcon.addEventListener('click', () => {
        passwordInputs[index].type = 'text';
        eyeIcon.style.display = 'none';
        document.querySelectorAll('.cl')[index].style.display = 'inline';
    });
});

document.querySelectorAll('.cl').forEach((eyeIconCl, index) => {
    eyeIconCl.addEventListener('click', () => {
        passwordInputs[index].type = 'password';
        eyeIconCl.style.display = 'none';
        document.querySelectorAll('.op')[index].style.display = 'inline';
    });
});
