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


let toastTimer = null;
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 24px;border-radius:10px;border:1px solid cadetblue;font-size:14px;z-index:9999;opacity:0;transition:opacity 0.3s;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.style.opacity = '0', 1500);
}