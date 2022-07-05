
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { v4 as uuid } from 'uuid';

function App() {
  const [products, setProducts] = useState([])
  const [sort,setSort] = useState("asc")
  const page = useRef(1)
  const filter = useRef()
   
  const handleScroll = (e) => {
    const {scrollHeight,scrollTop,clientHeight} = e.target;
    let dif = scrollHeight - scrollTop|0;
    const bottom = dif === clientHeight;

    if (bottom && products.length !== 100)
    {
      page.current+=1;
      let pg = page.current
      axios.get(`https://outscal-backend.herokuapp.com/product?page=${pg}`)
      .then(({data})=>{
        setProducts([...products,...data])
      })
    }
  }

  useEffect(()=>{
    axios.get(`https://outscal-backend.herokuapp.com/product`)
      .then(({data})=>{
        console.log(data)
        // setProducts(data)
      })
  },[])

  const sortFeature = () =>{
    console.log(sort,filter);
   axios.get(`https://outscal-backend.herokuapp.com/product?filter=${filter.current}&sort=${sort}`)
      .then(({data})=>{
        setProducts(data)
      })
  }

  const priceFilter = (e)=>{
    filter.current = e.target.value;
    axios.get(`https://outscal-backend.herokuapp.com/product?filter=${filter.current}&sort=${sort}`)
      .then(({data})=>{
        setProducts(data)
      })
  }

  if(products.length === 0)
  {
    return <div></div>
  }

  return ( 
  <div className ="App">
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <select name="" id="" onChange={priceFilter}>
            <option value="---">Price Filter</option>
            <option value="200">Below 200</option>
            <option value="400">200 to 400</option>
            <option value="600">400 to 600</option>
            <option value="800">600 to 800</option>
            <option value="1000">above 800</option>
          </select>

          <h1>Outscal Products</h1>
          
          <button onClick={()=> {
            page.current = 1; 
            setSort(sort ==="asc"?"desc":"asc");
            sortFeature()}
            }>Sort by {sort}</button>
        </div>
        <div className = "scroll" onScroll={(e)=>{handleScroll(e)}}>
          {products?.map(({name,price,image,_id})=>(
          <div className="element" key={uuid()}>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <h5>{price}</h5> 
          </div> ))}
        </div>
    </div>
  )

}
export default App
