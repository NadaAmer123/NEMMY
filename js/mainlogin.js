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
localStorage.clear();
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input, select").forEach(input => {
        let storedValue = localStorage.getItem(input.name);
        if (storedValue) {
            input.value = storedValue;
        }
    });
});


// إضافة الحدث للنموذج
document.getElementById('register-form').addEventListener('submit', function(event) {
    return validateForm(event, 'register');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    return validateForm(event, 'login');
});




window.onload = function() {
    document.querySelector('.register').style.backgroundColor = 'rgb(240, 39, 0)';
};

let moveEyesWithMouse = true;
let eyesFixedLeft = false;
let passwordVisible = true; // Track password visibility globally

function resetEyesPosition() {
    const pupils = document.querySelectorAll(".pupil");
    pupils.forEach(pupil => {
        pupil.style.transform = "translate(0, 0)";
    });
}

function moveEyesLeft() {
    const pupils = document.querySelectorAll(".pupil");
    pupils.forEach(pupil => {
        pupil.style.transform = "translate(-8px, 0)";  
    });
}

function updateEyeMovement(event) {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach(eye => {
        const pupil = eye.querySelector(".pupil");

        if (moveEyesWithMouse) {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            let angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
            const maxMove = 5;

            pupil.style.transform = `translate(${Math.cos(angle) * maxMove}px, ${Math.sin(angle) * maxMove}px)`;
        } else if (eyesFixedLeft) {
            pupil.style.transform = "translate(-8px, 0)";  // Eyes fixed to left
        }
    });
}

document.addEventListener("mousemove", (event) => {
    updateEyeMovement(event);
});

const eyeIcons = document.querySelectorAll('.op');  
const eyeIconsCl = document.querySelectorAll('.cl');  
const passwordInputs = document.querySelectorAll('.psswrd');  

function pass(pa) {
    if (pa) { // If the password is visible
        eyeIcons.forEach((eyeIcon, index) => {
            eyeIcon.style.display = 'none'; // Hide the open eye icon
            eyeIconsCl[index].style.display = 'inline'; // Show the closed eye icon
            resetEyesPosition();
            moveEyesWithMouse = true;
            eyesFixedLeft = false;
            passwordInputs[index].type = 'text'; // Change the input type to text
        });
    } else { // If the password is not visible
        eyeIcons.forEach((eyeIcon, index) => {
            eyeIcon.style.display = 'inline'; // Show the open eye icon
            eyeIconsCl[index].style.display = 'none'; // Hide the closed eye icon
            moveEyesLeft();
            moveEyesWithMouse = false;
            eyesFixedLeft = true;
            passwordInputs[index].type = 'password'; // Change the input type to password
        });
    }
}

document.querySelector('#register-btn').addEventListener('click', function() {
    pass(passwordVisible);
    document.querySelector('#form-container').style.transform = 'translateX(0)';
    document.querySelector('#register-form').style.display = 'block';
    document.querySelector('#login-form').style.display = 'none';
    document.querySelector('.register').style.backgroundColor = 'rgb(240, 39, 0)';
    document.querySelector('.login').style.backgroundColor = '';
});

document.querySelector('#login-btn').addEventListener('click', function() {
    pass(passwordVisible);
    document.querySelector('#form-container').style.transform = 'translateX(0)';
    document.querySelector('#register-form').style.display = 'none';
    document.querySelector('#login-form').style.display = 'block';
    document.querySelector('.login').style.backgroundColor = 'rgb(240, 39, 0)';
    document.querySelector('.register').style.backgroundColor = '';
    visiblePass(passwordVisible);
});

eyeIcons.forEach((eyeIcon, index) => {
    eyeIcon.addEventListener('click', () => {
        passwordVisible = true; // Update global state
        pass(passwordVisible);
    });
});

eyeIconsCl.forEach((eyeIconCl, index) => {
    eyeIconCl.addEventListener('click', () => {
        passwordVisible = false; // Update global state
        pass(passwordVisible);
    });
});
