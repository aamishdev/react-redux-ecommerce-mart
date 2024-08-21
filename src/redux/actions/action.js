//For Add Item to Cart

export const addCart = (product) =>{
    return {
        type : "ADDITEM",
        payload : product
    }
}
export const delCart = (id) =>{
    return {
        type : "DELITEM",
        payload : id
    }
}
export const delFromCart = (id) =>{
    return {
        type : "REMOVEALL",
        payload : id
    }
}