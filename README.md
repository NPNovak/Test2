# TestProject

Тестовое задание.

## Установка
1. Скопировать репозиторий и установить зависимости npm i
2. json-server --watch mocks/db.json для запуска json-server-а и использования данных.
3. npm start для запуска приложения (http://localhost:4200/);

## Инструкция
По нажатию на блок товара в колонке слева, появляется информация о нем с инпутом цены и селектом с двумя видами валют.Ъ
При выборе данных в селекте изменяется цена инпута (данные захардкодены,для доллара взято соотношение 1 к 70).            
При изменении инпута, через определенное время происходит сохранение цены для выбранного товара (при любой выбранной валюте).
В блоке с похожими товарами показана выборка из 5 (максимум 5 вне зависимости от их количества) товаров с такой же категорией как и у выбранного.

