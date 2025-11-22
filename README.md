# so-you · 감성적인 텍스트 변환 서비스

> 당신의 감정을 조용히 정리해드립니다 …

**so-you**는 사용자가 입력한 문장을 감성적으로 변환해주는 웹 서비스입니다. 톤은 부드럽고 잔잔하며, '당신만의 감정을 조용히 정리해주는 도구' 같은 느낌을 목표로 합니다.

## 🎯 프로젝트 구조

```
so-you/
├── frontend/          # Vue 3 + Vite 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── TextInput.vue
│   │   │   ├── ModeSelector.vue
│   │   │   ├── ResultBox.vue
│   │   │   └── ShareButton.vue
│   │   ├── composables/
│   │   │   └── useSoYouApi.js
│   │   ├── views/
│   │   │   └── HomeView.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   └── vite.config.js
│
└── server/            # Node.js + Express 백엔드
    ├── logic/
    │   └── emotionalRules.js
    ├── routes/
    │   └── transform.js
    ├── index.js
    └── package.json
```

## 🔧 기술 스택

### Frontend
- **Vue 3** - Composition API
- **Vite** - 빌드 도구
- **Axios** - HTTP 클라이언트
- **배포**: Vercel

### Backend
- **Node.js** - 런타임
- **Express** - 웹 프레임워크
- **CORS** - Cross-Origin Resource Sharing
- **배포**: Render

## ✨ 주요 기능

1. **감성 모드 선택** - 3가지 변환 모드 (기본 / 따뜻한 / 몽환적인)
2. **텍스트 변환** - 입력된 문장을 감성적으로 변환
3. **랜덤 문장** - 감성적인 랜덤 문장 제공
4. **링크 공유** - 변환된 문장 + 웹페이지 URL 클립보드 복사
5. **감성적 UI** - 파스텔 톤, 부드러운 애니메이션

## 🚀 로컬 개발 환경 설정

### 1. 백엔드 실행

```bash
# 백엔드 디렉토리로 이동
cd server

# 의존성 설치
npm install

# 환경 변수 설정 (선택사항)
cp .env.example .env

# 개발 서버 실행
npm start
```

백엔드 서버가 `http://localhost:3000`에서 실행됩니다.

### 2. 프론트엔드 실행

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 VITE_API_URL을 확인하세요

# 개발 서버 실행
npm run dev
```

프론트엔드가 `http://localhost:5173`에서 실행됩니다.

## 📡 API 문서

### Base URL
- 로컬: `http://localhost:3000`
- 프로덕션: `https://your-app.onrender.com`

### Endpoints

#### 1. GET /api/rules
사용 가능한 감성 모드 목록을 반환합니다.

**Response:**
```json
{
  "success": true,
  "modes": [
    {
      "id": "basic",
      "name": "기본",
      "description": "부드럽게 감정을 정리해요"
    },
    {
      "id": "warm",
      "name": "따뜻한",
      "description": "따뜻하게 마음을 감싸요"
    },
    {
      "id": "dreamy",
      "name": "몽환적인",
      "description": "꿈결 같은 표현으로 바꿔요"
    }
  ]
}
```

#### 2. POST /api/transform
텍스트를 감성적으로 변환합니다.

**Request:**
```json
{
  "text": "오늘 정말 힘들어",
  "mode": "basic"
}
```

**Response:**
```json
{
  "success": true,
  "result": "오늘 참 조금 벅차 …",
  "mode": "basic"
}
```

#### 3. GET /api/random
랜덤 감성 문장을 반환합니다.

**Response:**
```json
{
  "success": true,
  "sentence": "오늘도 당신은 충분히 잘하고 있어요 …"
}
```

## 🌐 배포 가이드

### Render 배포 (백엔드)

1. **Render 계정 생성** - [render.com](https://render.com)에서 계정 생성

2. **새 Web Service 생성**
   - Dashboard → New → Web Service
   - GitHub 저장소 연결
   - Root Directory: `server`

3. **설정**
   - **Name**: `so-you-api` (원하는 이름)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free

4. **환경 변수 설정**
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (프론트엔드 URL)

5. **배포**
   - "Create Web Service" 클릭
   - 자동으로 빌드 및 배포됩니다

6. **배포 URL 확인**
   - 예: `https://so-you-api.onrender.com`
   - 이 URL을 프론트엔드 환경 변수에 사용합니다

### Vercel 배포 (프론트엔드)

1. **Vercel 계정 생성** - [vercel.com](https://vercel.com)에서 계정 생성

2. **프로젝트 Import**
   - Dashboard → Add New → Project
   - GitHub 저장소 연결
   - Root Directory: `frontend`

3. **설정**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **환경 변수 설정**
   - Settings → Environment Variables
   - `VITE_API_URL`: `https://your-render-app.onrender.com` (백엔드 URL)

5. **배포**
   - "Deploy" 클릭
   - 자동으로 빌드 및 배포됩니다

6. **배포 URL 확인**
   - 예: `https://so-you.vercel.app`

### 배포 순서 권장사항

1. **먼저 백엔드를 Render에 배포**하고 URL을 확인합니다
2. **그 다음 프론트엔드를 Vercel에 배포**하면서 백엔드 URL을 환경 변수로 설정합니다
3. 프론트엔드 배포 후, **백엔드의 CORS 설정**에 프론트엔드 URL을 추가합니다

## 💡 감성 문장 변환 예시

### 기본 모드 (basic)
| 입력 | 출력 |
|------|------|
| 오늘 정말 힘들어 | 오늘 참 조금 벅차 … |
| 너무 슬퍼서 눈물이 나 | 너무 마음이 저려서 눈물이 나 … |
| 화나서 미칠 것 같아 | 속상해서 미칠 것 같아 … |

### 따뜻한 모드 (warm)
| 입력 | 출력 |
|------|------|
| 오늘 정말 힘들어 | 오늘 진심으로 조금씩 무거워지고 있어 … |
| 너무 외로워 | 너무 누군가 곁에 있었으면 해 … |
| 피곤해서 쓰러질 것 같아 | 쉬고 싶어서 쓰러질 것 같아 … |

### 몽환적인 모드 (dreamy)
| 입력 | 출력 |
|------|------|
| 오늘 정말 힘들어 | 오늘 어쩌면 구름 속을 헤매는 것 같아 … |
| 너무 슬퍼 | 너무 달빛이 흐려지는 기분이야 … |
| 화나서 미칠 것 같아 | 파도가 일렁이고 있어서 미칠 것 같아 … |

## 🎨 UI 디자인 특징

- **파스텔 컬러 팔레트** - 부드러운 보라, 파랑, 핑크 톤
- **넓은 여백** - 숨 쉬는 느낌의 레이아웃
- **둥근 폰트** - Noto Sans KR 경량 폰트
- **부드러운 애니메이션** - 페이드인, 호버 효과
- **소프트 카드 스타일** - 그림자와 그라데이션
- **반응형 디자인** - 모바일 최적화

## 🔄 업데이트 방법

### 감성 규칙 업데이트
백엔드의 `server/logic/emotionalRules.js` 파일을 수정하면 프론트엔드 재배포 없이 변환 규칙을 업데이트할 수 있습니다.

```javascript
// 새로운 규칙 추가 예시
export const transformationRules = {
  basic: [
    { from: /힘들어/gi, to: '조금 벅차' },
    { from: /새로운단어/gi, to: '변환된단어' }, // 추가
    // ...
  ]
};
```

Render는 Git push 시 자동으로 재배포됩니다.

## 📝 라이선스

MIT License

## 💬 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**당신만의 리듬으로 살아가세요 …**
