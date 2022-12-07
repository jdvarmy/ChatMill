#ChatMill
Приложение для обмена сообщениями. Репозиторий проекта на [GitHub](https://github.com/jdvarmy/ChatMill). 
Приложение написано с использованием шаблонизатора [Handlebars](https://handlebarsjs.com/), билдера [parceljs](https://parceljs.org/) и фреймворка Node.js [Express](https://expressjs.com/ru/)

## Доступные команды

В директории проекта, ты можешь запустить:

### `npm run start`
Билдит приложение и запускает сервер Express на 3000 порту [localhost:3000](localhost:3000)

### `npm run dev`
Запускает приложение в developer mode на 3000 порту  [localhost:3000](localhost:3000)

### `npm run build`
Билдит приложение для продакшена в папку build

### `npm run test`
Запуск тестов Mocha & Chai

### `npm run docker:build`
Билдит докер образ

### `npm run docker:run`
Запускает докер образ


#### Приложение развернуто на сервисе [Netlify по адресу](https://magnificent-kelpie-71b787.netlify.app)
#### Приложение развернуто на сервисе [Rerender по адресу](https://chat-ovsf.onrender.com/)
на Rerender есть странности (постоянно везде просит ввести данные банковской карты), но если попробовать сбилдить докер image то все норм npm run docker