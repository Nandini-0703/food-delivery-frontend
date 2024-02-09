import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart , useCart } from './ContextReducer';

const Card = (props) => {
    let options = props.options;
    let priceoptions = Object.keys(options);

    let dispatch = useDispatchCart();
    let data = useCart();
   const priceRef = useRef();
   const [finalPrice, setFinalPrice] = useState(0);
    const [qty,setQty] = useState(1);
    const [size , setSize] = useState("");
  
    useEffect(() => {
        setSize(priceRef.current.value);
      }, []); 
    
      useEffect(() => {
        setFinalPrice(qty * (parseInt(options[size], 10) || 0));
      }, [qty, size, options]);

    
    const handleAddToCart = async () => {
        let food = [];
      
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
            break;
          }
        }
      
        console.log("food.size:", food.size);
        console.log("size:", size);
      
        if (Object.keys(food).length !== 0) {
          if (food.size === size) {
            console.log("Updating item...");
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
          } else {
            console.log("Adding new item...");
            await dispatch({
              type: "ADD",
              id: props.foodItem._id,
              name: props.foodItem.name,
              price: finalPrice,
              qty: qty,
              size: size,
              img: props.ImgSrc
            });
          }
        } else {
          console.log("Adding new item (not in cart)...");
          await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.ImgSrc
          });
        }
      
        console.log("Updated cart:", data);
      };

    
 


    return (
        <div><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style = {{height:"150px" , objectFit:"fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                
                <div className="container w-100">
                    <select className='m-2 h-100  bg-success rounded'  onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100  bg-success rounded' ref = {priceRef} onChange={(e) => setSize(e.target.value)}>
                      {priceoptions.map((data) => {
                      return <option key = {data} value = {data}>{data}</option>
                      })}
                    </select>
                    <div className='d-inline h-100 fs-5'>rs.{finalPrice}/-</div>
                </div>
                <hr>

                </hr>
                <button className ={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add To Cart</button>
            </div>
        </div>
        </div>
    )
}

export default Card