import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../interface/product'
import { Link } from 'react-router-dom'
import { api } from '../../../config/axios'

const ListCategory = () => {
  const [categories,setCategory] = useState<ICategory[]>([])
  const handleLoad = async ()=>{
      try {
          const {data} = await api.get(`categories`)
          setCategory(data)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    handleLoad()
  },[])
  const onDelete = async(id:number|string)=>{
    try {
      if (confirm("Bạn chắc chứ?")){
          await api.delete(`categories/${id}`)        
          const newcategories = categories.filter(item=>item.id!=id)          
          alert('Xóa thành công')
          setCategory(newcategories)
      }
    } catch (error) {
        console.log(error);        
    }
  }
  return (
    <>     
      <h1 className='text-[36px] text-[#acaa13] mb-[60px] text-center'>Danh sách danh mục:</h1>
      <table className='[&_*]:text-left [&_td]:px-[10px] [&_td]:py-2 [&_th]:px-[10px] max-w-[500px] mx-auto border [&_td]:border [&_th]:border'>
        <thead>
          <tr>
            <th className='w-[50px]'>STT</th>
            <th className='w-[300px]'>Tên sản phẩm</th>
            <th className='w-[150px]'>Hình ảnh</th>
            <th className='w-[150px]'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((item,index)=>(
              <tr key={item.catId}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td><img src={item.image} alt="" /></td>
                  <td className='flex '>
                      <Link to={`/dashboard/edit-category/${item.catId}`} className='bg-[#3c11e8] text-white px-[15px] py-[4px] rounded'>Sửa</Link>
                      <button onClick={()=>onDelete(`${item.catId}`)} className='bg-[#7a0a0c] text-white px-[15px] py-[4px] rounded'>Xóa</button>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>      
    </>
  )
}

export default ListCategory