import express from 'express';
import { transformText, getRandomSentence, getAvailableModes } from '../logic/emotionalRules.js';
import { transformWithAI } from '../logic/aiService.js';

const router = express.Router();

// GET /api/rules - 사용 가능한 모드 목록 반환
router.get('/rules', (req, res) => {
    try {
        const modes = getAvailableModes();
        res.json({
            success: true,
            modes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '모드 목록을 가져오는데 실패했습니다'
        });
    }
});

// POST /api/transform - 텍스트 변환
router.post('/transform', async (req, res) => {
    try {
        const { text, mode } = req.body;

        // 입력 검증
        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                success: false,
                error: '변환할 텍스트를 입력해주세요'
            });
        }

        if (text.length > 1000) {
            return res.status(400).json({
                success: false,
                error: '텍스트는 1000자 이하로 입력해주세요'
            });
        }

        // 1. AI 변환 시도
        console.log(`\n[Transform Request] Mode: ${mode}, Input: "${text}"`);

        let result = null;
        const hasKey = !!process.env.GEMINI_API_KEY;

        if (hasKey) {
            console.log('✨ AI Transformation attempting... (API Key found)');
            result = await transformWithAI(text, mode);
            if (result) {
                console.log('✅ AI Transformation success');
                console.log(`🤖 AI Output: "${result}"`);
            } else {
                console.log('❌ AI Transformation returned null (fallback to rules)');
            }
        } else {
            console.log('⚠️ No API Key found. Skipping AI (using rules)');
        }

        // 2. AI 실패 시 (또는 키 없음) 규칙 기반 변환 사용
        if (!result) {
            result = transformText(text, mode);
            console.log(`📏 Rule-based Output: "${result}"`);
        }

        res.json({
            success: true,
            result,
            mode: mode || 'basic',
            isAi: !!result && hasKey // AI 사용 여부 표시
        });
    } catch (error) {
        console.error('Transform error:', error);
        res.status(500).json({
            success: false,
            error: '텍스트 변환 중 오류가 발생했습니다'
        });
    }
});

// GET /api/random - 랜덤 감성 문장 반환
router.get('/random', (req, res) => {
    try {
        const sentence = getRandomSentence();
        res.json({
            success: true,
            sentence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '랜덤 문장을 가져오는데 실패했습니다'
        });
    }
});

export default router;
