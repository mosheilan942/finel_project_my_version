import { expect, test, describe, afterAll } from "vitest";
import categoryService from "./categoryService.js";
import { config } from "dotenv";
config();

describe('getCategories', () => {
    test('returns an object when categories exist', async () => {
        const result = await categoryService.getCategories();
        expect(result).toBeInstanceOf(Object);
    });

    test('throws an error when categories are not found', async () => {
        await expect(categoryService.getCategories()).rejects.toThrow('Categorys not found');
    });
});
