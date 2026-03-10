# Editors Storybook

Storybook-каталог для Plugin UI в редакторах. Репозиторий используется как черновой, но уже рабочий reference-проект для перенесенных компонентов, токенов, тем и docs-страниц.

## Что внутри

- `src/components` - React-реализации UI-компонентов
- `src/stories` - stories и docs-страницы Storybook
- `src/data` - токены, размеры, цвета и статические данные для предпросмотра
- `.storybook` - глобальная конфигурация, toolbar theme switcher и стили docs

## Темы

В сторибуке поддерживаются темы:

- `Light`
- `Light Classic`
- `Modern Light`
- `Modern Dark`
- `Dark`
- `Dark Contrast`

Переключение темы идет через глобальный toolbar в Storybook. Часть stories также поддерживает режим `Auto`, который берет текущую тему из toolbar.

## Команды

```bash
npm install
npm run storybook
npm run build-storybook
npm run build
npm run lint
```

## Что проверять после изменений

- компонент выглядит одинаково предсказуемо во всех темах
- hover, pressed, disabled, loading и пустые состояния не ломают верстку
- docs-страницы остаются читаемыми в светлых и темных темах
- размеры и отступы совпадают с ожидаемым Plugin UI reference

## Текущее состояние

- `lint` настроен и проходит
- production build проходит
- storybook build проходит
- часть документации уже перенесена в `Pages/*`
- раздел `Editors` теперь содержит базовые правила для проверки переноса

## Следующие логичные улучшения

- добавить interaction tests или `play`-сценарии для ключевых контролов
- дописать более детальные guidelines для editor-specific flows
- сократить дублирование в stories, если проект из черновика перейдет в постоянный reference
