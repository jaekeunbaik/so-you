// 감성적인 텍스트 변환 규칙
// 각 모드별로 단어/구문 치환 규칙을 정의합니다

// 공통 접두사 (문장 시작에 랜덤 추가)
const prefixes = {
  basic: ['음, ', '저기, ', '있잖아, ', '혹시, '],
  warm: ['괜찮다면, ', '마음이 닿기를, ', '조용히 말해볼게, ', '따뜻한 마음으로, '],
  dreamy: ['어쩌면, ', '꿈속에서처럼, ', '바람이 전하길, ', '별에게 속삭이듯, ']
};

// 공통 접미사 (문장 끝에 랜덤 추가)
const suffixes = {
  basic: [' 그랬구나', ' 그렇네', ' 마음이 그래', ' 쉬어가도 돼'],
  warm: [' 내가 안아줄게', ' 넌 소중하니까', ' 언제나 응원해', ' 따뜻하게 감싸줄게'],
  dreamy: [' 마치 꿈처럼', ' 별빛이 내리네', ' 구름 위를 걷듯', ' 시간이 멈춘 듯해']
};

export const transformationRules = {
  basic: [
    // 감정/상태
    { from: /힘들어/gi, to: '조금 벅차' },
    { from: /슬퍼/gi, to: '마음이 저려' },
    { from: /화나/gi, to: '속상해' },
    { from: /짜증나/gi, to: '마음이 어지러워' },
    { from: /우울해/gi, to: '마음이 가라앉아' },
    { from: /외로워/gi, to: '혼자인 것 같아' },
    { from: /피곤해/gi, to: '지쳐가' },
    { from: /행복해/gi, to: '따뜻해' },
    { from: /좋아/gi, to: '괜찮아' },
    { from: /싫어/gi, to: '불편해' },
    { from: /무서워/gi, to: '겁이 나' },
    { from: /불안해/gi, to: '마음이 흔들려' },
    { from: /심심해/gi, to: '여유로워' },
    { from: /답답해/gi, to: '숨이 차' },

    // 일상 단어
    { from: /오늘/gi, to: '지금 이 순간' },
    { from: /내일/gi, to: '다가올 시간' },
    { from: /회사/gi, to: '그곳' },
    { from: /학교/gi, to: '배움의 터' },
    { from: /집/gi, to: '나만의 공간' },
    { from: /돈/gi, to: '현실의 무게' },
    { from: /사람/gi, to: '누군가' },
    { from: /친구/gi, to: '소중한 이' },
    { from: /가족/gi, to: '나의 뿌리' },
    { from: /사랑/gi, to: '마음' },

    // 어미/조사
    { from: /했어/gi, to: '했구나' },
    { from: /할래/gi, to: '하고 싶어' },
    { from: /해야해/gi, to: '해야 할 것 같아' },
    { from: /정말/gi, to: '참' },
    { from: /진짜/gi, to: '정말로' },
    { from: /너무/gi, to: '많이' },
    { from: /다시/gi, to: '한 번 더' }
  ],
  warm: [
    // 감정/상태
    { from: /힘들어/gi, to: '조금씩 무거워지고 있어' },
    { from: /슬퍼/gi, to: '눈물이 차오르는 것 같아' },
    { from: /화나/gi, to: '가슴이 답답해' },
    { from: /짜증나/gi, to: '마음이 뾰족해졌어' },
    { from: /우울해/gi, to: '마음 깊은 곳이 시려' },
    { from: /외로워/gi, to: '누군가 곁에 있었으면 해' },
    { from: /피곤해/gi, to: '포근히 쉬고 싶어' },
    { from: /행복해/gi, to: '마음이 몽글몽글해' },
    { from: /좋아/gi, to: '마음에 쏙 들어' },
    { from: /싫어/gi, to: '마음이 닫히네' },
    { from: /무서워/gi, to: '손을 잡아줘' },
    { from: /불안해/gi, to: '토닥임이 필요해' },
    { from: /심심해/gi, to: '나와 마주하고 있어' },
    { from: /답답해/gi, to: '창문을 열고 싶어' },

    // 일상 단어
    { from: /오늘/gi, to: '선물 같은 하루' },
    { from: /내일/gi, to: '설레는 내일' },
    { from: /회사/gi, to: '치열했던 하루' },
    { from: /학교/gi, to: '성장의 시간' },
    { from: /집/gi, to: '따스한 보금자리' },
    { from: /돈/gi, to: '필요한 것들' },
    { from: /사람/gi, to: '따뜻한 온기' },
    { from: /친구/gi, to: '함께하는 벗' },
    { from: /가족/gi, to: '언제나 내 편' },
    { from: /사랑/gi, to: '소중한 마음' },

    // 어미/조사
    { from: /했어/gi, to: '그랬구나, 고생했어' },
    { from: /할래/gi, to: '함께 할까?' },
    { from: /해야해/gi, to: '천천히 해도 돼' },
    { from: /정말/gi, to: '진심으로' },
    { from: /진짜/gi, to: '거짓 없이' },
    { from: /너무/gi, to: '가득히' },
    { from: /다시/gi, to: '새롭게' }
  ],
  dreamy: [
    // 감정/상태
    { from: /힘들어/gi, to: '구름 속을 헤매는 것 같아' },
    { from: /슬퍼/gi, to: '달빛이 흐려지는 기분이야' },
    { from: /화나/gi, to: '파도가 거칠게 일렁여' },
    { from: /짜증나/gi, to: '가시덤불에 찔린 듯해' },
    { from: /우울해/gi, to: '깊은 바닷속으로 가라앉아' },
    { from: /외로워/gi, to: '별 하나 없는 밤하늘 같아' },
    { from: /피곤해/gi, to: '안개 속에 잠기고 싶어' },
    { from: /행복해/gi, to: '햇살이 춤추는 것 같아' },
    { from: /좋아/gi, to: '바람이 부드러워' },
    { from: /싫어/gi, to: '그림자가 드리워져' },
    { from: /무서워/gi, to: '어둠이 짙어져' },
    { from: /불안해/gi, to: '나침반을 잃어버렸어' },
    { from: /심심해/gi, to: '시간이 멈춘 듯해' },
    { from: /답답해/gi, to: '새장에 갇힌 새처럼' },

    // 일상 단어
    { from: /오늘/gi, to: '이 계절의 한 페이지' },
    { from: /내일/gi, to: '아직 오지 않은 새벽' },
    { from: /회사/gi, to: '회색빛 미로' },
    { from: /학교/gi, to: '지혜의 숲' },
    { from: /집/gi, to: '나만의 작은 성' },
    { from: /돈/gi, to: '반짝이는 조각들' },
    { from: /사람/gi, to: '스쳐가는 인연' },
    { from: /친구/gi, to: '별을 함께 보는 이' },
    { from: /가족/gi, to: '나의 우주' },
    { from: /사랑/gi, to: '영원한 맹세' },

    // 어미/조사
    { from: /했어/gi, to: '지나갔어' },
    { from: /할래/gi, to: '꿈꾸고 싶어' },
    { from: /해야해/gi, to: '운명처럼' },
    { from: /정말/gi, to: '어쩌면' },
    { from: /진짜/gi, to: '마법처럼' },
    { from: /너무/gi, to: '아득히' },
    { from: /다시/gi, to: '다시 한번' }
  ]
};

// 랜덤으로 제공할 감성적인 문장들
export const randomSentences = [
  '오늘도 당신은 충분히 잘하고 있어요',
  '잠시 멈춰 서서, 깊게 숨을 쉬어보세요',
  '모든 감정은 지나가는 구름 같은 거예요',
  '당신의 속도로 천천히 가도 괜찮아요',
  '때로는 아무것도 하지 않는 것도 용기예요',
  '당신의 마음을 있는 그대로 느껴보세요',
  '작은 것에 감사하는 하루가 되길',
  '지금 이 순간, 당신은 소중해요',
  '완벽하지 않아도 아름다워요',
  '당신만의 리듬으로 살아가세요',
  '오늘 하루도 고생 많았어요',
  '당신의 감정은 모두 소중해요',
  '밤하늘의 별처럼 당신도 빛나고 있어요',
  '바람이 불면 부는 대로, 그렇게 흘러가요',
  '당신의 계절은 반드시 옵니다'
];

// 텍스트를 감성적으로 변환하는 함수
export function transformText(text, mode = 'basic') {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const rules = transformationRules[mode] || transformationRules.basic;
  let transformed = text;

  // 1. 단어 치환
  rules.forEach(rule => {
    transformed = transformed.replace(rule.from, rule.to);
  });

  // 2. 문장 끝맺음 처리 (단순화된 로직)
  // ~다 -> ~요 변환 등은 한국어 문법이 복잡하므로, 
  // 감성적인 접미사를 랜덤하게 붙이거나 어미를 부드럽게 바꾸는 방식으로 접근

  // 3. 랜덤 접두사 추가 (30% 확률)
  if (Math.random() < 0.3) {
    const modePrefixes = prefixes[mode] || prefixes.basic;
    const randomPrefix = modePrefixes[Math.floor(Math.random() * modePrefixes.length)];
    transformed = randomPrefix + transformed;
  }

  // 4. 마지막에 자동으로 " …" 추가 (이미 있으면 추가하지 않음)
  // 20% 확률로 모드별 특별 접미사 추가
  if (Math.random() < 0.2) {
    const modeSuffixes = suffixes[mode] || suffixes.basic;
    const randomSuffix = modeSuffixes[Math.floor(Math.random() * modeSuffixes.length)];
    transformed += randomSuffix;
  }

  if (!transformed.endsWith(' …') && !transformed.endsWith('…')) {
    transformed = transformed.trim() + ' …';
  }

  return transformed;
}

// 랜덤 문장 가져오기
export function getRandomSentence() {
  const index = Math.floor(Math.random() * randomSentences.length);
  return randomSentences[index] + ' …';
}

// 사용 가능한 모드 목록
export function getAvailableModes() {
  return Object.keys(transformationRules).map(mode => ({
    id: mode,
    name: mode === 'basic' ? '기본' : mode === 'warm' ? '따뜻한' : '몽환적인',
    description: mode === 'basic'
      ? '부드럽게 감정을 정리해요'
      : mode === 'warm'
        ? '따뜻하게 마음을 감싸요'
        : '꿈결 같은 표현으로 바꿔요'
  }));
}
