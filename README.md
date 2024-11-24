# ForceScan

## Сканирование портов и выявление уязвимостей

#### Специально для хакатона [Цифровой-Суверенитет.рф](https://xn----ctbbmaapfe8bebxhmwbjl2b.xn--p1ai/) от команды `git push --force`

## Запуск
1. Склонировать репозиторий и перейти в него:

    ```
    git clone https://github.com/rusandorx/hackathon.git git-push-force-frontend
    cd ./git-push-force-frontend
    ```

2. Создать и заполнить файл `.env` в корневой папке (пример: `.env.example`)
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
3. Иметь установленный [Docker Engine](https://docs.docker.com/engine/)
4. Собрать и запустить:
    ```
    docker compose up -d --build
    ```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
