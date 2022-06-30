import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  // const [load,setLoad] = useState(15)

  const handleScroll = (e) => {
    console.log("Hello")
    const {scrollHeight,scrollTop,clientHeight} = e.target;
    let dif = scrollHeight - scrollTop|0;
    const bottom = dif <= clientHeight+2;
    console.log(dif, clientHeight+2,bottom)
    if (bottom && products !== 100)
    {
      
      axios.get(`https://fake-ecommerce-api.herokuapp.com/api/products`)
      .then(({data})=>{
       
        setProducts([...products,...data])
      })
    }
  }

  useEffect(()=>{
    axios.get(`https://fake-ecommerce-api.herokuapp.com/api/products`)
      .then(({data})=>{
        setProducts(data)
      })
    
  },[])
  console.log(products.length)
  if(products.length === 0)
  {
    return <div></div>
  }

  return (
    <div className ="App">
      <div>
        <h1>Outscal Products</h1>
      </div>
      <div className = "scroll" onScroll={(e)=>{handleScroll(e)}}>
        {products.map(({name,price,images})=>(
        <div className="element">
           <img src={images[0]} alt={name} />
           <h4>{name}</h4>
           <h5>{price}</h5>
        </div>
        ))}
      </div>
    </div>
  )
}

export default App