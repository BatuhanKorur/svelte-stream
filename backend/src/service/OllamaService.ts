export class OllamaService {
    private static readonly BASE_URL = 'http://localhost:11434/api';
    private static async postRequest(endpoint: string, body: any) {
        const response = await fetch(`${this.BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }

        return response;
    }

    private static async getRequest(endpoint: string) {
        const response = await fetch(`${this.BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }
        return await response.json();
    }

    public static async* streamChatResponse(prompt: string, model: string = 'mistral') {
        console.log('HEllo')
        const response = await this.postRequest('generate', {
            model,
            prompt,
            stream: true,
        });

        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.trim() !== '') {
                        yield JSON.parse(line);
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    }

    public static async listLocalModels() {
        return await this.getRequest('/tags');
    }

    public static async listRunningModels() {
        return await this.getRequest('/running');
    }
}


