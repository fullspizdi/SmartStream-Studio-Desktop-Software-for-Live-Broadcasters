// security.ts
// Security management module for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';
import crypto from 'crypto';

export class SecurityManager {
    /**
     * Encrypts data using AES-256-CBC encryption algorithm.
     * @param data - The data to encrypt.
     * @returns The encrypted data.
     */
    encryptData(data: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(config.security.encryptionKey, 'hex'), iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const encryptedData = iv.toString('hex') + ':' + encrypted;
        logWithTimestamp('Data encrypted successfully.');
        return encryptedData;
    }

    /**
     * Decrypts data using AES-256-CBC encryption algorithm.
     * @param encryptedData - The data to decrypt.
     * @returns The decrypted data.
     */
    decryptData(encryptedData: string): string {
        const textParts = encryptedData.split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = textParts.join(':');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(config.security.encryptionKey, 'hex'), iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        logWithTimestamp('Data decrypted successfully.');
        return decrypted;
    }

    /**
     * Checks if the IP address is allowed to access the system.
     * @param ipAddress - The IP address to check.
     * @returns A boolean indicating if access is allowed.
     */
    checkIPAccess(ipAddress: string): boolean {
        const isAllowed = config.security.allowedIPs.includes(ipAddress);
        logWithTimestamp(`${ipAddress} access ${isAllowed ? 'granted' : 'denied'}.`);
        return isAllowed;
    }
}
