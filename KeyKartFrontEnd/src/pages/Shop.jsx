import DisplayGrid from '../components/DisplayGrid'

const Shop = () => {
  return (
    <div className='p-10'>
        <p className='toast text-left'>Shop / All Products</p>
        <div className='rounded-md relative w-full h-96 overflow-hidden object-cover'>
            <img  className=" md:-translate-y-1/3" src="src/assets/images/switchbanner.webp"></img>
            <p className="absolute text-slate-700 bottom-20 left-0 px-8 text-3xl font-['NeueBit']">All Products</p>
        </div>
        <DisplayGrid/>
    </div>
  )
}

export default Shop;