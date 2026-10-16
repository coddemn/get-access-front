# Browser client for get-access

> **Примечание:** на данный момент это сырой прототип, проект на стадии разработки. Однако, вы можете посмотреть, как это будет выглядеть в будущем.

GetAccess - это современный менеджер паролей, позволяющий хранить и управлять своими учетными данными от различных онлайн-сервисов в одном надежном и удобном месте.

Ниже представлены страницы браузерного приложения с перечислением возможностей

---
## Login and registrate

- Базовые окна для получения прав доступа к приложению.

<img src="screenshots/login.png" alt="login page" width="500" height="auto">

- На странице регистрации можно также привязать другие сервисы для дополнительной защиты, и возможно в будущем, дополнительных функций сервиса.

<img src="screenshots/registrate.png" alt="registrate page" width="500" height="auto">

---
## Main page - manager GetAccess

Главная страница менеджера, где располагается таблица со всеми добавленными онлайн-сервисами пользователя. Основные возможности:
- Просмотр списка онлайн-сервисов;
- Быстрое копирование логина или пароля по нажатию на соответствующую иконку;
- Удаление сервиса из списка по нажатию на корзину;
- Добавление новой записи по кнопке (см. описание Adding page);

<img src="screenshots/manager.png" alt="manager page" width="900" height="auto">

- Просмотр полного описания сервиса по нажатию на иконку

<img src="screenshots/view_desc.png" alt="view description button" width="900" height="auto">

<img src="screenshots/descrip.png" alt="description" width="900" height="auto">

- Редактирование данных сервиса по нажатию на карандаш - действие можно применить и отменить по соответствующим иконкам;

<img src="screenshots/edit.png" alt="edit data" width="900" height="auto">

- Горячий поиск по полям "Имя сервиса" и "Логин", для быстрого поиска нужных данных.

<img src="screenshots/search_login.png" alt="search" width="900" height="auto">

<img src="screenshots/search_servname.png" alt="search" width="900" height="auto">

---
## Adding page

- Добавление новой записи (сервиса) при заполнении обязательных данных;
- Скрытие пароля при вводе в поле;
- Генерация случайного пароля (как доп. функция для удобства)

<img src="screenshots/edit_gen_pass.png" alt="edit page" width="500" height="auto">

<img src="screenshots/edit_hide_pass.png" alt="edit page" width="500" height="auto">

---
## Profile page

- Просмотр профиля с данными пользователя
- Привязка и отвязка доп. сервисов

<img src="screenshots/profile.png" alt="profile page" width="800" height="auto">

- Редактирование основных данных пользователя;

<img src="screenshots/profile_edit.png" alt="profile edit data" width="800" height="auto">

- Изменение пароля по подтверждению текущего;

<img src="screenshots/profile_edit_pass.png" alt="profile edit pass" width="600" height="auto">

- Привязка Email или VK (если не привязали при регистрации)

<img src="screenshots/profile_add_email.png" alt="profile email" width="700" height="auto">

При указании почты, отправляется письмо с подтверждением, о чем нам сообщает уведомление снизу

<img src="screenshots/profile_send_mail.png" alt="profile email" width="800" height="auto">

Вот так выглядят привязанные сервисы (можно отвязать)

<img src="screenshots/profile_binds.png" alt="profile binds" width="400" height="auto">

---
# 💻 Локальный запуск

Если хотите протестировать прототип на своем пк, после клонирования репозитория, при открытии любой страницы, вас будет перекидывать на Login page.

Тестовые данные для входа:
login: `admin` 
password: `12345`

>Примечание: данные для входа прописаны в самом коде в login.html, при логине создается токен доступа в памяти, без которого вас не будет пускать на другие страницы.

