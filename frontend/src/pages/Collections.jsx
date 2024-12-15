import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import ProductItem from '../components/ProductItem'

const Collections = () => {
  const { products,search,showsearch } = useContext(ShopContext)
  const [showFilter, setshowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sortType, setSortType] = useState("relevant")

  const handleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!=e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const handleSubcategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev=>prev.filter(item=>item!=e.target.value))
    }
    else{
      setSubcategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    let productsCopy = products.slice()  //creating copy of the products
    if(showsearch && search){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy = productsCopy.filter(item=>category.includes(item.category))
    }
    if(subcategory.length>0){
      productsCopy = productsCopy.filter(item=>subcategory.includes(item.subCategory))

    }
    setFilterProducts(productsCopy)
  }

  const sortProducts = ()=>{
    let filterproductsCopy = filterProducts.slice() 
    switch(sortType){
      case 'low-high':
        setFilterProducts(filterproductsCopy.sort((a,b)=>a.price-b.price))
        break
      case 'high-low':
        setFilterProducts(filterproductsCopy.sort((a,b)=>b.price-a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category,subcategory,search,showsearch,products])

  useEffect(()=>{
    sortProducts()
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} />
        </p>
        {/* category filter */}
        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${showFilter ? "" : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-800'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={handleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={handleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={handleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${showFilter ? "" : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-800'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={handleSubcategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={handleSubcategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={handleSubcategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1 mb-10'>
        <div className='flex justify-between text-base mb-4 sm:text-2xl '>
          <p className='text-gray-600 text-center sm:text-2xl'>ALL <span className='text-gray-800 font-semibold'>COLLECTIONS</span></p>
          {/* sort products */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-200 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-high</option>
            <option value="high-low">Sort by: High-low</option>
          </select>
        </div>

        {/* display all products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} image = {item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections