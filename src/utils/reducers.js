export const priceReducer = (prev, curr) => {
    if (prev === 0) { 
        return prev + curr.price
    }
    return prev + curr.price
}