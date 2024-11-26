import { describe, it, expect } from 'vitest';

describe('Application Tests', () => {
    it('should return true for true', () => {
        expect(true).toBe(true);
    });

    it('should return false for false', () => {
        expect(false).toBe(false);
    });

    it('should add numbers correctly', () => {
        const sum = 1 + 2;
        expect(sum).toBe(3);
    });

    it('should concatenate strings correctly', () => {
        const greeting = 'Hello' + ' ' + 'World';
        expect(greeting).toBe('Hello World');
    });

    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arr.includes(3)).toBe(true);
    });
});