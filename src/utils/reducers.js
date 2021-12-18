
   /*  const _totalPrice = cart.reduce(priceReducer, 0)  */
export const priceReducer = (prev, curr) => {
    
    if (curr.discount === 100) { 
        return 0
    }
    if (curr.discount > 0) {
        return (curr.price - (curr.price * (curr.discount / 100)).toFixed(2)) + prev
    }
    return prev + curr.price
}