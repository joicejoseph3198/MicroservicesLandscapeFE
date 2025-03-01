import SearchBar from '../components/SearchBar';
import DisplayGrid from '../components/DisplayGrid'

const Shop = () => {
  return (
    <div className='p-10'>
        <p className='text-5xl lg:text-8xl text-left font-[NeueBit] text-slate-700'>Shop / All Products</p>
        <div className='rounded-md relative w-full h-96 overflow-hidden object-cover'>
            <img  className=" w-full md:-translate-y-[200px] lg:-translate-y-1/3" src="src/assets/images/switchbanner.webp"></img>
            <p className="absolute text-slate-700 bottom-28 md:bottom-10 left-0 px-8 text-3xl font-['NeueBit']">All Products</p>
        </div>
        <SearchBar/>
        <DisplayGrid/>
    </div>
  )
}

export default Shop;