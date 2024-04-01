import React, {useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {

  let navigate = useNavigate();
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let prices = Object.keys(options);
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  
  const handleQty = (e) => {
    console.log(e.target.value);
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddtoCart = async() =>{
    if (!localStorage.getItem("authToken") && !localStorage.getItem("userEmail")) {
      navigate("/login")
    }
    // console.log(props.foodItem.name);
    let food = []
    for (const item of data) { 
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size != size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.foodItem.img })
        return
      }
      return
    }

    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name,img:props.foodItem.img, price:finalPrice, qty:qty, size:size})
    console.log(data);
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [])
  

  return (
    <div>
      <div className="card mt-3" style={{ "width": "19rem", "height": "470px" }}>
        <img src={props.foodItem.img} className="card-img-top" style={{ "height": "180px" }} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className='container w-100'>
            <select className='m-2 h-100  bg-success rounded'  onChange={handleQty}>
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select className='m-2 h-100  bg-success rounded' ref={priceRef}  onChange={handleOptions}>
              {
                prices.map((item) => { return (<option key={item} value={item}>{item}</option>) })
              }
            </select>

            <div className='d-inline h-100 fs-5'>
              Rs. {finalPrice}\-
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
