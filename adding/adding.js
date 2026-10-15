function togglePassVisibility() {
    const input = document.getElementById('password');
    const btn = document.getElementById('togglePassBtn');

    if (input.type === 'password') {
        // Показываем пароль
        input.type = 'text';
        btn.classList.add('active');
    } else {
        // Скрываем пароль
        input.type = 'password';
        btn.classList.remove('active');
    }
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 16; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const input = document.getElementById('password');
    input.value = pass;
    // Сразу показываем пароль после генерации, чтобы пользователь мог скопировать
    input.type = 'text';
    document.getElementById('togglePassBtn').classList.add('active');
}

document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Запись сохранена!');
    setTimeout(() => {
        window.location.href = '../manager/manager.html';
    }, 1000);
});