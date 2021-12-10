// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    return nums.reduce((acc, el) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export type ActionTriangleType = {}

export function getTriangleType(a: number, b: number, c: number): string {
    const isTriangle = a + b > c && a + c > b && b + c > a
    if (a === b && b === c) {
        return "10"
    } else if (isTriangle && (a === b || b === c || a === c)) {
        return "01"
    } else if (a !== b && b !== c && a !== c) {
        return "11"
    } else if (!isTriangle) {
        return "00"
    }
    return ""
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    return String(number)
        .split("")
        .map((el) => Number(el))
        .reduce((acc, el) => acc + el)
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    const result = arr.reduce((
            result, num, index) =>
            index % 2 === 0
                ? {...result, sumOdd: result.sumOdd + num}
                : {...result, sumEven: result.sumEven + num},
        {sumOdd: 0, sumEven: 0}
    )
    return result.sumEven > result.sumOdd

    let sumEven = 0
    let sumOdd = 0
    for (let i = 0; i < arr.length; i++) {
        if (i % 2) {
            sumOdd += arr[i]
        } else {
            sumEven += arr[i]
        }
    }
    return sumEven > sumOdd
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
    return areaCr / areaSq <= Math.PI / 4
}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

// Д.З.:
export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}