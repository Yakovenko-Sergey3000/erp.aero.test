# ERP.AERO Test — Save files REST API

This repository is a small REST API (ESM/Node.js + Express + MySQL) for authentication and file upload.

## 1) Поднять базу в Docker

Проект уже содержит docker-compose.yaml.
Он поднимает MySQL и использует следующие переменные окружения из файла `.env`:
- MSQL_USER
- MSQL_ROOT_PASSWORD
- MSQL_DATABASE

Создайте файл `.env` в корне проекта и задайте нужные значения (пример ниже). Затем выполните:

```bash
# из корня репозитория
docker compose up -d
```

Это запустит контейнер MySQL на порту 3306 и смонтирует данные в папку ./sql-data.

## 2) Установить зависимости

Установите зависимости через npm или yarn:

```bash
# npm
npm install

# или yarn
yarn install
```

## 3) Запустить сервер

Сервер автоматически применяет миграции при старте. Для запуска используйте:

```bash
# npm
npm run start

# или yarn
yarn start
```

По умолчанию сервер поднимется на порту, указанном в переменной `PORT` (если не задана — 3000).

## Конфигурация (.env)
Проект использует переменные из `configs/config.js` и `docker-compose.yaml`. Создайте файл `.env` в корне проекта со значениями, как минимум:

```
# Сервер
PORT=8080

# MySQL (должны совпадать с docker-compose)
MSQL_ROOT_PASSWORD=admin
MSQL_USER=root
MSQL_DATABASE=erp.aero.db

# JWT секреты
JWT_ACCESS_SECRET=hard_secret
JWT_REFRESH_SECRET=more_hard_secret
```

Обратите внимание: здесь используются переменные с префиксом `MSQL_` (а не `MYSQL_`), они должны совпадать в `.env` и `docker-compose.yaml`.

## Проверка запуска
- После запуска Docker базы и сервера вы должны увидеть в логах:
  - `✅ All migrations applied"`
  - `✅ Server is running on port <PORT>`
- Доступ к API осуществляется по адресу: `http://localhost:<PORT>`.
- Статические файлы (загрузки) доступны по пути `/uploads`.

## Postman collection
Для проверки api можно импортировать postman колекцию которая лежит в папке `/docs`
