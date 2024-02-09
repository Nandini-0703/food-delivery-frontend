import React, { createContext , useReducer , useContext } from 'react'

 const CartStateContext = createContext();
 const CartDispatchContext = createContext();

 const reducer = (state , action) => {
 switch(action.type){
    case "ADD":
        return [...state , {id:action.id , name: action.name , size:action.size , qty:action.qty , price:action.price , img:action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
       
        case "UPDATE":
  let arr = [...state];
  const indexToUpdate = arr.findIndex(food => food.id === action.id);

  if (indexToUpdate !== -1) {
    arr[indexToUpdate] = {
      ...arr[indexToUpdate],
      qty: parseInt(action.qty) + arr[indexToUpdate].qty,
      price: action.price + arr[indexToUpdate].price
    };
  }

  return arr;

       
  case "DROP":
    let empArray = []
    return empArray;
  
           
        default : 
        console.log('error in reducer');
 }
 }

export  const CartProvider = ({children}) => {


    const[state , dispatch] = useReducer(reducer , [])
    return (
    <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);