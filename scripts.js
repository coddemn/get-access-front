(function() {
    var token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '../login/login.html';
    }
})();

const sidebar = document.getElementById('sidebar');


// ---- Сайдбар и выход ----
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}

function logout() {
    if (confirm('Вы действительно хотите выйти?')) {
        localStorage.removeItem('access_token');
        window.location.href = '../login/login.html';
    }
}