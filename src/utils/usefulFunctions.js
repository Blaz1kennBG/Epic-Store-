export function getRandomItemFromArray(items) {
    const firstItemIndex =  Math.floor(Math.random()*items.length)
    const firstArticle = items[firstItemIndex]
    items.splice(firstItemIndex, 1)

    const secondItemIndex = Math.floor(Math.random()*items.length)
    const secondArticle = items[secondItemIndex]
    items.splice(secondItemIndex, 1)

    return [firstArticle, secondArticle]
}