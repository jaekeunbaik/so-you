import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// 모드별 프롬프트 설정
const prompts = {
  basic: `
    당신은 부드럽고 사려 깊은 심리 상담가입니다.
    사용자의 말을 듣고, 그 감정을 인정해주면서 조금 더 부드럽고 긍정적인 언어로 순화해주세요.
    너무 가르치려 들지 말고, 공감하는 태도로 짧게 한 문장으로 대답하세요.
    문장은 한국어로 작성하고, 끝에 " ..."을 붙여 여운을 남기세요.
  `,
  warm: `
    당신은 세상에서 가장 따뜻한 마음을 가진 친구입니다.
    사용자의 말에 담긴 힘듦이나 외로움을 감싸안아주는 위로의 말을 건네주세요.
    마치 따뜻한 차 한 잔을 건네는 것처럼 포근하게 말해주세요.
    문장은 한국어로 작성하고, 끝에 " ..."을 붙여 여운을 남기세요.
  `,
  dreamy: `
    당신은 꿈과 별을 노래하는 시인입니다.
    사용자의 현실적인 고민이나 감정을 몽환적이고 시적인 비유로 바꿔주세요.
    구름, 별, 달, 바다, 바람 같은 자연의 이미지를 사용하여 아름답게 표현하세요.
    문장은 한국어로 작성하고, 끝에 " ..."을 붙여 여운을 남기세요.
  `
};

export async function transformWithAI(text, mode = 'basic') {
  // API 키가 없으면 null 반환 (규칙 기반으로 fallback)
  if (!process.env.GEMINI_API_KEY) {
    console.log('Gemini API Key not found, falling back to rules.');
    return null;
  }

  try {
    const systemPrompt = prompts[mode] || prompts.basic;
    const userPrompt = `사용자 입력: "${text}"\n\n위 입력을 당신의 페르소나에 맞춰 감성적으로 변환해주세요. 부가적인 설명 없이 변환된 문장만 출력하세요.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    let transformedText = response.text().trim();

    // 따옴표 제거
    transformedText = transformedText.replace(/^["']|["']$/g, '');

    // " ..."이 없으면 추가
    if (!transformedText.endsWith('…') && !transformedText.endsWith('...')) {
      transformedText += ' …';
    }

    return transformedText;
  } catch (error) {
    console.error('AI Transformation Error:', error);
    return null; // 에러 발생 시 규칙 기반으로 fallback
  }
}
