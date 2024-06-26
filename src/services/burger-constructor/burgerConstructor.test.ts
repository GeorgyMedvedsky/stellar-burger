import { describe, test, expect, beforeEach } from '@jest/globals';
import { TConstructorState, burgerConstructorSlice, addItem, removeItem, moveDown, moveUp, clearConstructor } from './slice';
import { nanoid } from '@reduxjs/toolkit';

describe('burgerConstructor slice', () => {
    const initialState: TConstructorState = {
        bun: null,
        ingredients: []
    }
    const bun = {
        _id: nanoid(),
        name: 'Test Bun',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 10,
        calories: 30,
        price: 200,
        image: 'test-image.jpg',
        image_large: 'test-image-large.jpg',
        image_mobile: 'test-image-mobile.jpg'
    };
    const ingredient = {
        _id: nanoid(),
        name: 'Test Ingredient',
        type: 'main',
        proteins: 20,
        fat: 15,
        carbohydrates: 12,
        calories: 37,
        price: 270,
        image: 'test-image.jpg',
        image_large: 'test-image-large.jpg',
        image_mobile: 'test-image-mobile.jpg'
    };

    beforeEach(() => {
        initialState.bun = null;
        initialState.ingredients = [];
    });

    test('тест добавления булки в конструктор', () => {
        const action = addItem(bun);
        const newState = burgerConstructorSlice.reducer(initialState, action);
        const expectedBun = newState.bun;
        expect(expectedBun).toEqual(expect.objectContaining(bun));
    });

    test('тест добавления ингредиента в конструктор', () => {
        const action = addItem(ingredient);
        const newState = burgerConstructorSlice.reducer(initialState, action);
        const expectedIngredient = newState.ingredients[0];
        expect(expectedIngredient).toEqual(expect.objectContaining(ingredient));
    });

    test('тест удаления ингредиента из конструктора', () => {
        const actionAdd = addItem(ingredient);
        let newState = burgerConstructorSlice.reducer(initialState, actionAdd);
        const actionRemove = removeItem(newState.ingredients[0].id);
        newState = burgerConstructorSlice.reducer(newState, actionRemove);
        expect(newState.ingredients).not.toContainEqual(expect.objectContaining(ingredient));
    });
    
    test('тест перемещения ингредиента вниз', () => {
        const actionAddFirst = addItem(ingredient);
        let newState = burgerConstructorSlice.reducer(initialState, actionAddFirst);
        const actionAddSecond = addItem({...ingredient, _id: nanoid()});
        newState = burgerConstructorSlice.reducer(newState, actionAddSecond);
        const actionMoveDown = moveDown(0);
        newState = burgerConstructorSlice.reducer(newState, actionMoveDown);
        expect(newState.ingredients[1]).toEqual(expect.objectContaining(ingredient));
    });
    
    test('тест перемещения ингредиента вверх', () => {
        const actionAddFirst = addItem(ingredient);
        let newState = burgerConstructorSlice.reducer(initialState, actionAddFirst);
        const actionAddSecond = addItem({...ingredient, _id: nanoid()});
        newState = burgerConstructorSlice.reducer(newState, actionAddSecond);
        const actionMoveUp = moveUp(1);
        newState = burgerConstructorSlice.reducer(newState, actionMoveUp);
        expect(newState.ingredients[0]).toEqual(expect.objectContaining({...ingredient, _id: expect.any(String)}));
    });
    
    test('тест очистки конструктора', () => {
        const actionAddBun = addItem(bun);
        let newState = burgerConstructorSlice.reducer(initialState, actionAddBun);
        const actionAddIngredient = addItem(ingredient);
        newState = burgerConstructorSlice.reducer(newState, actionAddIngredient);
        const actionClear = clearConstructor();
        newState = burgerConstructorSlice.reducer(newState, actionClear);
        expect(newState).toEqual(initialState);
    });
});