import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='w-1/5 [&_ul]:pl-4 bg-white h-screen'>
      <ul>
        <li>
          Danh mục
          <ul>
            <li>
              <Link to={'/dashboard/list-categories'}>Danh sách danh mục</Link>
            </li>
            <li>
              <Link to={'/dashboard/add-category'}>Thêm danh mục</Link>
            </li>
          </ul>
        </li>
        <li>
          Sản phẩm
          <ul>
            <li>
              <Link to={'/dashboard/list-products'}>Danh sách sản phẩm</Link>
            </li>
            <li>
              <Link to={'/dashboard/add-product'}>Thêm sản phẩm</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar