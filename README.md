# Journey Bites 服務介紹

**Journey Bites** 是一個專為旅行愛好者設計的部落格平台，在這裡，創作者可以自由地創作並分享他們的旅行遊記。無論是背包客的冒險故事、家庭度假的點滴，還是獨特的文化體驗，都能在這裡找到屬於自己的一片天地。

![image](https://github.com/Journey-bites/journey-bites-website/assets/65709519/610c6c4c-f6fd-48a3-9839-80c527bb6238)

## 功能特色

### 創作與分享
- **新增文章**：創作者可以輕鬆新增並發布文章，分享他們的旅行經歷和見聞。
- **多媒體支持**：支持圖片、影片等多媒體內容，讓遊記更豐富多彩。

### 社群互動
- **追蹤功能**：讀者可以追蹤他們喜愛的創作者。
- **評論與互動**：讀者可以對文章進行評論，與創作者和其他讀者進行互動交流。

### 即將推出的功能
- **文章付費功能**：創作者將可以設置文章為付費內容，通過優質內容獲取收益。
- **通知功能** : 第一時間獲取追蹤創作者的最新文章和更新。
- **更多方便功能**：我們將不斷改進和新增功能，提升使用體驗，讓旅程分享更加便捷有趣。

## 開始分享你的旅行經歷吧！
https://journey-bites.zeabur.app/

不論你是想分享自己的旅行故事，還是想探索他人的冒險經歷，Journey Bites 都是你的最佳選擇。立即加入我們，開始你的旅程分享之旅吧！

# Journey Bites Frontend Project

This is the frontend application for Journey Bites.

## Prerequisites

Before running this project, you must have the following installed:

- Node.js (v20.9.0 or later)
- PNPM (v9.0.0 or later)

## Installation

1. Clone this repository to your local machine.
2. Run `pnpm install` in the project directory to install all required dependencies.
3. Create a `.env.local` file at the root directory of the project and add the necessary environment variables. Refer to the `.env.sample` file for the required variables.

## Environment Variables

Ensure the following variables are set in the `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=your_API_endpoint
```

## Starting the Project

1. Run `pnpm dev` to start the application in development mode.
2. Run `pnpm build` to build the application.
3. Run `pnpm start` to start the application in production mode.
4. Run `pnpm lint` to lint the codebase.
5. Run `pnpm mock` to start the local mock server.

## NPM Scripts

Available development scripts:

- `pnpm dev`: Starts the application in development mode.
- `pnpm build`: Builds the application.
- `pnpm start`: Starts the application in production mode.
- `pnpm lint`: Lints the codebase.
- `pnpm mock`: Starts the local mock server.

## Tech Stack

Technologies used in this project:

- **Next.js**: React framework
- **React**: JavaScript library
- **React Query**: Data fetching and state management
- **Zustand**: State management
- **Tailwind CSS**: CSS framework
- **Radix UI**: Accessible UI components
- **ESLint**: Linting tool
- **Prettier**: Code formatter
- **TypeScript**: Superset of JavaScript
- **JSON Server**: Tool to set up a simple REST API

### Commit Message Guidelines

#### Rules

To keep the commit history neat and easy to understand, we require all Git commit messages to follow the format:
`[type]: [title]`

- type

  - `build`：修改構建系統或外部依賴
  - `ci`：修改 CI 配置文件或腳本
  - `chore`：對非業務邏輯程式碼的更改，例如更新開發工具
  - `docs`：文件更新
  - `feat`：新增功能
  - `fix`：修復 bug
  - `perf`：改善程式的性能
  - `refactor`：重構程式碼，不添加新功能或修復 bug
  - `revert`：還原先前的 commit
  - `style`：改善程式碼風格，例如縮排、空格等
  - `test`：增加或修改測試程式

- title (sentence-case)
  - 簡短地描述提交的改變。主題應遵循句子格式，即首字母大寫，其餘字母小寫。 Ex:`This is an example of sentence case.`

#### Example

- `build: Update eslint config for production`
- `ci: Add GitHub Actions workflow for automated testing`
- `chore: Update project dependencies to latest versions`
- `docs: Add usage instructions to README`
- `feat: Add new user registration feature`
- `fix: Resolve login issue for locked accounts`
- `docs: Update API documentation`
- `perf: Optimize image loading for faster page rendering`
- `refactor: Simplify error handling in API client`
- `revert: Roll back to previous version of login form`
- `style: Enforce consistent indentation with Prettier`
- `test: Add unit tests for user registration endpoint`
