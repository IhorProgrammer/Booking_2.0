export default class AES {
    constructor() {}

    static async encrypt(plainText: any, key: any) {
        const aesKey = await AES.getAesKey(key);
        const iv = crypto.getRandomValues(new Uint8Array(16));
    
        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);
    
        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            aesKey,
            data
        );
    
        return {
            encrypted: AES.arrayBufferToBase64(encrypted),
            iv: AES.arrayBufferToBase64(iv)
        };
    }
    
    static async decrypt(encryptedBase64: any, ivBase64: any, key: any) {
        const aesKey = await AES.getAesKey(key);
        const iv = AES.base64ToArrayBuffer(ivBase64);
        const encrypted = AES.base64ToArrayBuffer(encryptedBase64);
    
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            aesKey,
            encrypted
        );
    
        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    }
    
    static async getAesKey(key: any) {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(key);
        const hashedKey = await crypto.subtle.digest('SHA-256', keyData);
    
        return crypto.subtle.importKey(
            'raw',
            hashedKey,
            {
                name: 'AES-CBC',
                length: 256,
            },
            false,
            ['encrypt', 'decrypt']
        );
    }


    static arrayBufferToBase64(buffer: any) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    static base64ToArrayBuffer(base64: any) {
        let binaryString = window.atob(base64);
        let len = binaryString.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
