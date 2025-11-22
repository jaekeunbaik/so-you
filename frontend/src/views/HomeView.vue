<template>
  <div class="home-view container">
    <!-- 헤더 -->
    <header class="header">
      <h1 class="title">so-you</h1>
      <p class="subtitle">당신의 감정을 조용히 정리해드립니다 …</p>
    </header>

    <!-- 랜덤 문장 -->
    <div class="random-section">
      <p class="random-text">{{ randomSentence }}</p>
      <button @click="loadRandomSentence" class="refresh-button" :disabled="loading">
        <span class="refresh-icon">↻</span>
      </button>
    </div>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <!-- 텍스트 입력 -->
      <TextInput v-model="inputText" />

      <!-- 모드 선택 -->
      <ModeSelector v-model="selectedMode" :modes="modes" />

      <!-- 변환 버튼 -->
      <button 
        @click="handleTransform" 
        class="transform-button"
        :disabled="!inputText.trim() || loading"
      >
        <span v-if="loading" class="loading-spinner">⏳</span>
        <span v-else>감성적으로 변환하기</span>
      </button>

      <!-- 에러 메시지 -->
      <transition name="fade">
        <p v-if="error" class="error-message">{{ error }}</p>
      </transition>

      <!-- 결과 박스 -->
      <ResultBox :result="transformedText" />

      <!-- 공유 버튼 -->
      <ShareButton v-if="transformedText" :text="transformedText" />
    </main>

    <!-- 푸터 -->
    <footer class="footer">
      <p class="footer-text">
        당신만의 리듬으로 살아가세요
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TextInput from '../components/TextInput.vue';
import ModeSelector from '../components/ModeSelector.vue';
import ResultBox from '../components/ResultBox.vue';
import ShareButton from '../components/ShareButton.vue';
import { useSoYouApi } from '../composables/useSoYouApi.js';

const { loading, error, getModes, transformText, getRandomSentence } = useSoYouApi();

const inputText = ref('');
const selectedMode = ref('basic');
const transformedText = ref('');
const randomSentence = ref('오늘도 당신은 충분히 잘하고 있어요 …');
const modes = ref([
  { id: 'basic', name: '기본', description: '부드럽게 감정을 정리해요' },
  { id: 'warm', name: '따뜻한', description: '따뜻하게 마음을 감싸요' },
  { id: 'dreamy', name: '몽환적인', description: '꿈결 같은 표현으로 바꿔요' }
]);

// 컴포넌트 마운트 시 초기 데이터 로드
onMounted(async () => {
  // 모드 목록 가져오기
  const fetchedModes = await getModes();
  if (fetchedModes && fetchedModes.length > 0) {
    modes.value = fetchedModes;
  }
  
  // 랜덤 문장 가져오기
  await loadRandomSentence();
});

// 랜덤 문장 로드
const loadRandomSentence = async () => {
  const sentence = await getRandomSentence();
  if (sentence) {
    randomSentence.value = sentence;
  }
};

// 텍스트 변환 처리
const handleTransform = async () => {
  if (!inputText.value.trim()) return;
  
  try {
    const result = await transformText(inputText.value, selectedMode.value);
    transformedText.value = result;
  } catch (err) {
    console.error('변환 실패:', err);
  }
};
</script>

<style scoped>
.home-view {
  width: 100%;
  max-width: 700px;
  padding: var(--spacing-xl) var(--spacing-md);
}

/* 헤더 */
.header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: 300;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: 0.05em;
}

.subtitle {
  font-size: var(--font-size-base);
  font-weight: 300;
  color: var(--color-text-soft);
}

/* 랜덤 문장 섹션 */
.random-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 16px var(--color-shadow);
}

.random-text {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: 300;
  color: var(--color-text);
  text-align: center;
  line-height: 1.7;
}

.refresh-button {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-primary-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.refresh-button:hover:not(:disabled) {
  background: var(--color-primary);
  transform: rotate(180deg);
}

.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: var(--font-size-xl);
}

/* 메인 컨텐츠 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* 변환 버튼 */
.transform-button {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 16px var(--color-shadow);
  margin-top: var(--spacing-md);
}

.transform-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-shadow);
}

.transform-button:active:not(:disabled) {
  transform: translateY(0);
}

.transform-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 에러 메시지 */
.error-message {
  padding: var(--spacing-md);
  background: var(--color-accent);
  color: var(--color-text);
  border-radius: var(--radius-md);
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 400;
}

/* 푸터 */
.footer {
  margin-top: var(--spacing-2xl);
  text-align: center;
}

.footer-text {
  font-size: var(--font-size-sm);
  font-weight: 300;
  color: var(--color-text-soft);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .home-view {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
  
  .header {
    margin-bottom: var(--spacing-xl);
  }

  .title {
    font-size: 2rem;
  }

  .random-section {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
  }
  
  .refresh-button {
    width: 100%;
    height: 48px; /* 터치 타겟 확보 */
  }

  .transform-button {
    padding: var(--spacing-md);
    font-size: 1.1rem; /* 버튼 텍스트 키우기 */
  }
}
</style>
