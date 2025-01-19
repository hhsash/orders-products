# Orders & Products

Orders & Products — это веб-приложение, разработанное с использованием **Next.js** и предназначенное для управления данными о продуктах и приходах. Приложение предоставляет интерфейс для просмотра информации о заказах, продуктах и их стоимости в различных валютах, а также поддерживает мультиязычность.

---

## 🚀 Функциональные возможности

### 1. **Просмотр списка всех приходов**

-   Подробная информация о каждом заказе, включая количество продуктов, даты и общую стоимость.
-   Удаление заказа из списка.

### 2. **Просмотр каталога всех доступных продуктов**

-   Фильтрация продуктов по категориям.
-   Отображение стоимости продукта в разных валютах (например, USD, UAH).

### 3. **Локализация**

-   Поддержка нескольких языков с использованием **next-intl**.
-   Динамическая подгрузка переводов для удобной навигации на выбранном языке.

---

## 🛠️ Технологический стек

-   **Next.js** — для серверного рендеринга и маршрутизации.
-   **Redux Toolkit** — для управления глобальным состоянием приложения.
-   **next-intl** — для поддержки мультиязычности.
-   **Bootstrap** — для стилизации пользовательского интерфейса.
-   **Axios** — для выполнения HTTP-запросов к API.

## 💻 Как запустить проект локально

### 1. Клонирование репозитория

Склонируйте проект на ваш локальный компьютер:

```bash
git clone https://github.com/hhsash/orders-products.git
cd orders-products
```

### 2. Установка зависимостей

Убедитесь, что у вас установлен Node.js и выполните команду для установки всех зависимостей:

```bash
npm install
```

### 3. Запуск локального сервера разработки

Запустите сервер разработки:

```bash
npm run dev
```
