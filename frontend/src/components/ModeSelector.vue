<template>
  <div class="mode-selector">
    <p class="label">감성 모드를 선택해주세요</p>
    <div class="modes">
      <button
        v-for="mode in modes"
        :key="mode.id"
        @click="selectMode(mode.id)"
        :class="['mode-button', { active: modelValue === mode.id }]"
      >
        <span class="mode-name">{{ mode.name }}</span>
        <span class="mode-description">{{ mode.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'basic'
  },
  modes: {
    type: Array,
    default: () => [
      { id: 'basic', name: '기본', description: '부드럽게 감정을 정리해요' },
      { id: 'warm', name: '따뜻한', description: '따뜻하게 마음을 감싸요' },
      { id: 'dreamy', name: '몽환적인', description: '꿈결 같은 표현으로 바꿔요' }
    ]
  }
});

const emit = defineEmits(['update:modelValue']);

const selectMode = (modeId) => {
  emit('update:modelValue', modeId);
};
</script>

<style scoped>
.mode-selector {
  width: 100%;
  margin: var(--spacing-lg) 0;
}

.label {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-soft);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.modes {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.mode-button {
  flex: 1;
  min-width: 150px;
  padding: var(--spacing-md);
  background: var(--color-white);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 16px var(--color-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.mode-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-shadow);
}

.mode-button.active {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, var(--color-white) 100%);
  box-shadow: 0 6px 20px var(--color-shadow),
              0 0 0 3px var(--color-primary-soft);
}

.mode-name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
}

.mode-description {
  font-size: var(--font-size-sm);
  font-weight: 300;
  color: var(--color-text-soft);
  text-align: center;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .modes {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .mode-button {
    min-width: 100%;
    flex-direction: row; /* 모바일에서는 가로 배치 */
    justify-content: flex-start;
    padding: var(--spacing-md);
    text-align: left;
  }

  .mode-button.active {
    background: var(--color-primary-soft); /* 그라데이션 대신 단색 배경이 깔끔할 수 있음 */
  }

  .mode-name {
    min-width: 60px;
    font-weight: 600;
  }

  .mode-description {
    text-align: left;
    font-size: 0.85rem;
  }
}
</style>
