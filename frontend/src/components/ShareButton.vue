<template>
  <div class="share-button-wrapper">
    <button 
      @click="copyToClipboard" 
      :class="['share-button', { copied: showCopied }]"
      :disabled="!text"
    >
      <span class="button-icon">{{ showCopied ? '✓' : '🔗' }}</span>
      <span class="button-text">
        {{ showCopied ? '복사되었어요' : '링크 복사하기' }}
      </span>
    </button>
    <transition name="fade">
      <p v-if="showCopied" class="copied-message">
        클립보드에 복사되었습니다 …
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});

const showCopied = ref(false);

const copyToClipboard = async () => {
  if (!props.text) return;
  
  try {
    const shareText = `${props.text}\n\n— so-you에서 감성적으로 변환되었습니다\n${window.location.href}`;
    
    await navigator.clipboard.writeText(shareText);
    
    showCopied.value = true;
    setTimeout(() => {
      showCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    // Fallback for older browsers
    fallbackCopyTextToClipboard(shareText);
  }
};

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopied.value = true;
    setTimeout(() => {
      showCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Fallback 복사 실패:', err);
  }
  
  document.body.removeChild(textArea);
};
</script>

<style scoped>
.share-button-wrapper {
  width: 100%;
  margin-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.share-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: 400;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 16px var(--color-shadow);
  border: none;
}

.share-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-shadow);
}

.share-button:active:not(:disabled) {
  transform: translateY(0);
}

.share-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.share-button.copied {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
}

.button-icon {
  font-size: var(--font-size-lg);
  transition: transform var(--transition-base);
}

.share-button.copied .button-icon {
  transform: scale(1.2);
}

.button-text {
  font-weight: 400;
}

.copied-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
  font-weight: 300;
  text-align: center;
}

@media (max-width: 768px) {
  .share-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
