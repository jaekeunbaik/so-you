import axios from 'axios';
import { ref } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useSoYouApi() {
    const loading = ref(false);
    const error = ref(null);

    // API 클라이언트 생성
    const api = axios.create({
        baseURL: API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // 사용 가능한 모드 목록 가져오기
    const getModes = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.get('/api/rules');
            return response.data.modes;
        } catch (err) {
            error.value = err.response?.data?.error || '모드를 불러오는데 실패했습니다';
            console.error('Get modes error:', err);
            return [];
        } finally {
            loading.value = false;
        }
    };

    // 텍스트 변환하기
    const transformText = async (text, mode = 'basic') => {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.post('/api/transform', {
                text,
                mode
            });
            return response.data.result;
        } catch (err) {
            error.value = err.response?.data?.error || '텍스트 변환에 실패했습니다';
            console.error('Transform error:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // 랜덤 문장 가져오기
    const getRandomSentence = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.get('/api/random');
            return response.data.sentence;
        } catch (err) {
            error.value = err.response?.data?.error || '랜덤 문장을 불러오는데 실패했습니다';
            console.error('Random sentence error:', err);
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        getModes,
        transformText,
        getRandomSentence
    };
}
