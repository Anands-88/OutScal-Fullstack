import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  const handleScroll = (e) => {
    const {scrollHeight,scrollTop,clientHeight} = e.target;
    let dif = scrollHeight - scrollTop|0;
    const bottom = dif <= clientHeight+2;
    
    if (bottom && products !== 100)
    {
      
      axios.get(`http://localhost:8888/products`)
      .then(({data})=>{
       
        setProducts([...products,...data])
      })
    }
  }

  useEffect(()=>{
    axios.get(` http://localhost:8888/products`)
      .then(({data})=>{
        setProducts(data)
      })
    
  },[])

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
        {products.map(({name,price,image})=>(
        <div className="element">
           <img src={image} alt={name} />
           <h4>{name}</h4>
           <h5>{price}</h5>
        </div>
        ))}
      </div>
    </div>
  )
}

export default App