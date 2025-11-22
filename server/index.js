import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transformRouter from './routes/transform.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://so-you-swart.vercel.app', // 유저의 Vercel 주소
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            // 프로덕션에서는 엄격하게 체크하되, 배포 초기 이슈 방지를 위해 일단 허용
            console.log('Origin not explicitly allowed but proceeding:', origin);
            callback(null, true);
        }
    },
    credentials: true
}));

// JSON 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'so-you API',
        status: 'running',
        message: '당신의 감정을 조용히 정리해드립니다 …',
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 라우트
app.use('/api', transformRouter);

// 404 핸들러
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: '요청하신 경로를 찾을 수 없습니다'
    });
});

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: '서버 오류가 발생했습니다'
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`\n✨ so-you API server is running`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n당신만의 감정을 조용히 정리해드립니다 …\n`);
});
