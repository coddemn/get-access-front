var userData = {
    username: 'Иван Иванов',
    login: 'ivan_dev',
    password: 'mock_old_pass',
    email: null,
    vk: null
};

// Регулярка для проверки email
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderProfile() {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('userLogin').textContent = userData.login;
    document.getElementById('usernameInput').value = userData.username;
    document.getElementById('loginInput').value = userData.login;

    var emailStatus = document.getElementById('emailStatus');
    var emailBtn = document.querySelector('#emailRow .link-btn');
    if (userData.email) {
        emailStatus.textContent = userData.email;
        emailStatus.classList.add('linked');
        emailBtn.textContent = 'Отвязать';
        emailBtn.classList.add('linked');
        emailBtn.onclick = unlinkEmail;
    } else {
        emailStatus.textContent = 'Не привязан';
        emailStatus.classList.remove('linked');
        emailBtn.textContent = 'Привязать';
        emailBtn.classList.remove('linked');
        emailBtn.onclick = openEmailModal;
    }

    var vkStatus = document.getElementById('vkStatus');
    var vkBtn = document.querySelector('#vkRow .link-btn');
    if (userData.vk) {
        vkStatus.textContent = userData.vk;
        vkStatus.classList.add('linked');
        vkBtn.textContent = 'Отвязать';
        vkBtn.classList.add('linked');
        vkBtn.onclick = unlinkVK;
    } else {
        vkStatus.textContent = 'Не привязан';
        vkStatus.classList.remove('linked');
        vkBtn.textContent = 'Привязать';
        vkBtn.classList.remove('linked');
        vkBtn.onclick = linkVK;
    }
}

// --- Редактирование профиля ---

function startEditProfile() {
    var info = document.getElementById('profileInfo');
    info.querySelectorAll('.view-mode').forEach(function(el) {
        el.style.display = 'none';
    });
    info.querySelectorAll('.edit-mode').forEach(function(el) {
        el.style.display = 'block';
    });

    var actions = document.querySelector('.profile-actions');
    actions.querySelectorAll('.view-mode').forEach(function(el) {
        el.style.display = 'none';
    });
    actions.querySelectorAll('.edit-mode').forEach(function(el) {
        el.style.display = 'inline-block';
    });
}

function saveProfile() {
    var newUsername = document.getElementById('usernameInput').value.trim();
    var newLogin = document.getElementById('loginInput').value.trim();

    if (!newUsername || !newLogin) {
        showToast('Заполните все поля');
        return;
    }

    userData.username = newUsername;
    userData.login = newLogin;
    renderProfile();
    cancelEditProfile();
    showToast('Данные сохранены');
}

function cancelEditProfile() {
    var info = document.getElementById('profileInfo');
    info.querySelectorAll('.view-mode').forEach(function(el) {
        el.style.display = 'inline-block';
    });
    info.querySelectorAll('.edit-mode').forEach(function(el) {
        el.style.display = 'none';
    });

    var actions = document.querySelector('.profile-actions');
    actions.querySelectorAll('.view-mode').forEach(function(el) {
        el.style.display = 'inline-block';
    });
    actions.querySelectorAll('.edit-mode').forEach(function(el) {
        el.style.display = 'none';
    });

    document.getElementById('usernameInput').value = userData.username;
    document.getElementById('loginInput').value = userData.login;
}

// --- Смена пароля ---

function openPassModal() {
    var modal = document.getElementById('passModal');
    modal.classList.add('show');
    document.getElementById('oldPass').focus();
}

function closePassModal() {
    var modal = document.getElementById('passModal');
    modal.classList.remove('show');
    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
}

function changePassword() {
    var oldPass = document.getElementById('oldPass').value;
    var newPass = document.getElementById('newPass').value;
    var confirmPass = document.getElementById('confirmPass').value;

    if (!oldPass || !newPass || !confirmPass) {
        showToast('Заполните все поля');
        return;
    }

    if (oldPass !== userData.password) {
        showToast('Текущий пароль неверен');
        return;
    }

    if (newPass !== confirmPass) {
        showToast('Пароли не совпадают');
        return;
    }

    if (newPass.length < 6) {
        showToast('Пароль должен быть не менее 6 символов');
        return;
    }

    userData.password = newPass;
    closePassModal();
    showToast('Пароль изменён');
}

// --- Email ---

function openEmailModal() {
    var modal = document.getElementById('emailModal');
    modal.classList.add('show');
    document.getElementById('emailInput').focus();
}

function closeEmailModal() {
    var modal = document.getElementById('emailModal');
    modal.classList.remove('show');
    document.getElementById('emailInput').value = '';
}

function sendEmailConfirm() {
    var email = document.getElementById('emailInput').value.trim();

    if (!emailRegex.test(email)) {
        showToast('Введите корректный email');
        return;
    }

    closeEmailModal();
    showToast('Письмо с подтверждением отправлено на ' + email);

    setTimeout(function() {
        userData.email = email;
        renderProfile();
        showToast('Email привязан!');
    }, 2000);
}

function unlinkEmail() {
    if (!confirm('Отвязать email?')) return;
    userData.email = null;
    renderProfile();
    showToast('Email отвязан');
}

// --- VK ---

function linkVK() {
    showToast('Переход к авторизации ВКонтакте...');
    setTimeout(function() {
        userData.vk = 'id123456789';
        renderProfile();
        showToast('VK привязан!');
    }, 1500);
}

function unlinkVK() {
    if (!confirm('Отвязать ВКонтакте?')) return;
    userData.vk = null;
    renderProfile();
    showToast('VK отвязан');
}

// Закрытие модалок по клику вне окна
document.getElementById('emailModal').addEventListener('click', function(e) {
    if (e.target === this) closeEmailModal();
});
document.getElementById('passModal').addEventListener('click', function(e) {
    if (e.target === this) closePassModal();
});

renderProfile();