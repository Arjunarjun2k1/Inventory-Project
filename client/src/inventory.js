import React, { useEffect, useState } from "react";
import axios from "axios"

const Inventory = ()=>{
    const [itemsData,setItemsData] = useState({name:'',price:null,quantity:null})
    const [itemsDataError,setItemDataError] = useState({name:'',price:'',quantity:''})
    const [status,setStatus] = useState('')
    const [list,setList] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/item`)
        .then((res)=>{
            setList(res.data.item)
        })
        .catch((err)=>{
            setList([])
        })
    },[status])

    const handleItemsData = (e)=>{
        let {name,value} = e.target
        setItemsData({
            ...itemsData,
            [name]:value
        })
        setItemDataError({
            ...itemsDataError,
            [name]:''
        })
    }

    const validateAddItems = ()=>{
        let isError = []
        for(let [key,value] of Object.entries(itemsData) ){
            if(itemsData[key] === '' || itemsData[key]===null){
                setItemDataError((prev)=>{
                   return{
                    ...prev,
                    [key]:'Enter values'
                   } 
                })
                isError.push(true)
            }
        }
        return isError.includes(true)
    }

    const addItems = ()=>{
        let error = validateAddItems()
        if(!error){
            axios.post(`http://localhost:8000/api/item`,itemsData)
            .then((res)=>{
                setStatus(res.data.message)
                setItemsData({name:'',price:null,quantity:null})
            })
            .catch((err)=>{
                setStatus(err.response.data.message)
            })
        }
    }
    return(
        <>
        <h1 style={{textAlign:'center'}}>Inventory Items </h1>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'200px',justifyContent:'space-around'}}>
            <h3>Add Item to Inventory</h3>
            <input type="text" placeholder="Name" name="name" value={itemsData.name} onChange={handleItemsData} />
            <p style={{color:'red'}}>{itemsDataError.name}</p>
            <input min={1} type="number" placeholder="Price per quantity" name="price" value={itemsData.price} onChange={handleItemsData}  />
            <p style={{color:'red'}}>{itemsDataError.price}</p>
            <input min={1} type="number" placeholder="Quantity in KG" name="quantity" value={itemsData.quantity} onChange={handleItemsData}  />
            <p style={{color:'red'}}>{itemsDataError.quantity}</p>
            <button onClick={addItems}>Add</button>
            <p>{status}</p>
        </div>
        <h3 style={{textAlign:'center'}}>Items in Inventory</h3>
        <div style={{display:'flex',width:'100%',flexWrap:'wrap',border:'1px solid black'}}>
            {list?.map((value)=>{
                return(
                    <div style={{width:'30%',border:'1px solid black',borderRadius:'8px',margin:'8px',padding:"8px"}}>
                        <h5>{value.name}</h5>
                        <p>Price per quantity : {value.price}</p>
                        <p>Available quantity : {value.quantity} KG</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Inventory;