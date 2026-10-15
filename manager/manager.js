const mockData = [
    { id: 1, service: "Google",   login: "user@gmail.com", password: "secret123",    link: "https://google.com",  desc: "Основной аккаунт для почты, календаря и документов. Используется ежедневно для работы и личных задач." },
    { id: 2, service: "GitHub",   login: "dev_user",       password: "gh_pass_99",    link: "https://github.com",  desc: "Аккаунт для разработки, хранения репозиториев и совместной работы над проектами. Содержит приватные репозитории." },
    { id: 3, service: "VK",       login: "vk_login_1",      password: "vk_secret",     link: "https://vk.com",      desc: "Личный профиль." },
    { id: 4, service: "Netflix",  login: "net_flix_acc",    password: "net_pass_2024", link: "https://netflix.com", desc: "Подписка на стриминговый сервис Netflix для просмотра фильмов и сериалов в высоком качестве." }
];

const tableBody   = document.getElementById('tableBody');
const searchInput  = document.getElementById('globalSearch');
const sidebar      = document.getElementById('sidebar');

// ---- Вспомогательные функции ----

function getFilteredData() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return mockData;
    return mockData.filter(item =>
        item.service.toLowerCase().includes(term) ||
        item.login.toLowerCase().includes(term)
    );
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Скопировано!');
    });
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

function showDescPopup(text) {
    let popup = document.getElementById('desc-popup');
    if (popup) popup.remove();

    popup = document.createElement('div');
    popup.id = 'desc-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-title">Описание</div>
            <div class="popup-text">${escapeHtml(text)}</div>
            <button class="popup-close" onclick="closeDescPopup()">Закрыть</button>
        </div>
    `;
    popup.addEventListener('click', function(e) {
        if (e.target === popup) closeDescPopup();
    });
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('show'));
}

function closeDescPopup() {
    let popup = document.getElementById('desc-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 200);
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---- Рендеринг таблицы ----

function renderTable(data) {
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-results">Ничего не найдено</td></tr>';
        return;
    }

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <span class="view-mode">${escapeHtml(item.service)}</span>
                <input type="text" class="edit-mode" value="${escapeAttr(item.service)}" style="display:none;">
            </td>

            <td>
                <div class="cell-with-copy view-mode">
                    <span>${escapeHtml(item.login)}</span>
                    <button class="icon-btn copy-btn" onclick="copyText('${escapeAttr(item.login)}')" title="Копировать логин">📋</button>
                </div>
                <input type="text" class="edit-mode" value="${escapeAttr(item.login)}" style="display:none;">
            </td>

            <td>
                <div class="cell-with-copy view-mode">
                    <span class="password-dots">••••••••</span>
                    <button class="icon-btn copy-btn" onclick="copyText('${escapeAttr(item.password)}')" title="Копировать пароль">📋</button>
                </div>
                <input type="password" class="edit-mode" value="${escapeAttr(item.password)}" style="display:none; width:120px;">
            </td>

            <td>
                <span class="view-mode">
                    <a href="${escapeAttr(item.link)}" target="_blank"
                        style="color:cadetblue;text-decoration:none;">${escapeHtml(item.link)}</a>
                </span>
                <input type="url" class="edit-mode" value="${escapeAttr(item.link)}" style="display:none;">
            </td>

            <td>
                <div class="desc-container">
                    <span class="desc-text view-mode">${escapeHtml(item.desc)}</span>
                    <button class="desc-toggle-btn view-mode"
                            onclick="showDescPopup('${escapeAttr(item.desc)}')"
                            title="Показать полностью"
                            style="display:inline-block;">↗</button>
                    <input type="text" class="edit-mode" value="${escapeAttr(item.desc)}" style="display:none; width:100%;">
                </div>
            </td>

            <td>
                <div class="action-icons">
                    <button class="icon-btn edit-icon view-mode"
                            onclick="startEdit(this, ${item.id})" title="Редактировать">✏️</button>
                    <button class="icon-btn delete-icon view-mode"
                            onclick="deleteRow(${item.id}, this)" title="Удалить">🗑️</button>

                    <button class="icon-btn save-icon edit-mode"
                            onclick="saveEdit(this, ${item.id})"
                            style="display:none;" title="Сохранить">✅</button>
                    <button class="icon-btn cancel-icon edit-mode"
                            onclick="cancelEdit(this, ${item.id})"
                            style="display:none;" title="Отмена">❌</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Проверяем: если текст описания влез полностью — скрываем иконку ↗
    tableBody.querySelectorAll('.desc-text').forEach(descEl => {
        const toggleBtn = descEl.nextElementSibling;
        if (toggleBtn && toggleBtn.classList.contains('desc-toggle-btn')) {
            // scrollHeight > clientHeight значит, что текст обрезан
            if (descEl.scrollHeight <= descEl.clientHeight) {
                toggleBtn.style.display = 'none';
            }
        }
    });
}

// ---- Поиск ----

function filterTable() {
    renderTable(getFilteredData());
}

// ---- Редактирование ----

function startEdit(btn, id) {
    const row = btn.closest('tr');
    row.querySelectorAll('.view-mode').forEach(el => {
        el.style.display = 'none';
    });
    row.querySelectorAll('.edit-mode').forEach(el => {
        if (el.tagName === 'INPUT') {
            el.style.display = 'block';
        } else {
            el.style.display = 'inline-flex';
        }
    });
}

function saveEdit(btn, id) {
    const row = btn.closest('tr');
    const inputs = row.querySelectorAll('input.edit-mode');
    const index = mockData.findIndex(item => item.id === id);
    if (index > -1) {
        mockData[index].service  = inputs[0].value;
        mockData[index].login    = inputs[1].value;
        mockData[index].password = inputs[2].value;
        mockData[index].link     = inputs[3].value;
        mockData[index].desc     = inputs[4].value;
    }
    renderTable(getFilteredData());
    showToast('Изменения сохранены');
}

function cancelEdit(btn, id) {
    renderTable(getFilteredData());
}

// ---- Удаление ----

function deleteRow(id, element) {
    if (!confirm('Вы уверены, что хотите удалить эту запись?')) return;
    const index = mockData.findIndex(item => item.id === id);
    if (index > -1) mockData.splice(index, 1);
    renderTable(getFilteredData());
    showToast('Запись удалена');
}

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

// ---- Старт ----
renderTable(mockData);