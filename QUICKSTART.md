# So-You Quick Start Guide

## 🚀 빠른 시작

### 로컬 개발 환경

#### 1단계: 백엔드 실행
```bash
cd server
npm install
npm start
```
✅ 서버가 http://localhost:3000 에서 실행됩니다

#### 2단계: 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```
✅ 앱이 http://localhost:5173 에서 실행됩니다

---

## 🌐 배포 가이드

### Render 배포 (백엔드)

1. **Render.com** 접속 및 로그인
2. **New Web Service** 클릭
3. GitHub 저장소 연결
4. 설정:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
5. 환경 변수 추가:
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (나중에 Vercel URL 입력)
6. **Create Web Service** 클릭
7. 배포 URL 복사 (예: `https://so-you-api.onrender.com`)

### Vercel 배포 (프론트엔드)

1. **Vercel.com** 접속 및 로그인
2. **Import Project** 클릭
3. GitHub 저장소 선택
4. 설정:
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
5. 환경 변수 추가:
   - `VITE_API_URL` = (Render에서 복사한 백엔드 URL)
6. **Deploy** 클릭
7. 배포 완료 후 URL 확인 (예: `https://so-you.vercel.app`)
8. **Render로 돌아가서** `FRONTEND_URL` 환경 변수를 Vercel URL로 업데이트

---

## 📡 API 테스트

### Health Check
```bash
curl http://localhost:3000/
```

### 모드 목록 가져오기
```bash
curl http://localhost:3000/api/rules
```

### 텍스트 변환
```bash
curl -X POST http://localhost:3000/api/transform \
  -H "Content-Type: application/json" \
  -d '{"text":"오늘 정말 힘들어","mode":"basic"}'
```

### 랜덤 문장
```bash
curl http://localhost:3000/api/random
```

---

## 🎨 감성 변환 예시

| 모드 | 입력 | 출력 |
|------|------|------|
| 기본 | 오늘 정말 힘들어 | 오늘 참 조금 벅차 … |
| 따뜻한 | 너무 외로워 | 너무 누군가 곁에 있었으면 해 … |
| 몽환적인 | 너무 슬퍼 | 너무 달빛이 흐려지는 기분이야 … |

---

## 📁 프로젝트 구조

```
so-you/
├── server/              # 백엔드 (Node.js + Express)
│   ├── logic/
│   │   └── emotionalRules.js
│   ├── routes/
│   │   └── transform.js
│   └── index.js
│
└── frontend/            # 프론트엔드 (Vue 3 + Vite)
    ├── src/
    │   ├── components/  # 4개 컴포넌트
    │   ├── composables/ # API 통신
    │   └── views/       # 메인 뷰
    └── vite.config.js
```

---

## 🔧 환경 변수

### Backend (.env)
```
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

---

## ✨ 주요 기능

- ✅ 3가지 감성 모드 (기본/따뜻한/몽환적인)
- ✅ 실시간 텍스트 변환
- ✅ 랜덤 감성 문장 제공
- ✅ 클립보드 링크 공유
- ✅ 파스텔 감성 디자인
- ✅ 반응형 모바일 지원

---

**당신만의 리듬으로 살아가세요 …**
