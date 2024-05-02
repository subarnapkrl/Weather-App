import  { useEffect, useState } from 'react'

const Input = ({onSearch}) => {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 5000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

   


  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='md:flex  flex-row items-center justify-center space-x-4'>

            <h1 className='lg:text-center mt-2'>Right now in,</h1>

            <input type="text" placeholder='search...' className='text-xl  font-bold p-2 outline-none bg-transparent capitalize border-b-4' 
            onChange={handleChange}
            value={searchTerm}
            />

           
        </div>
    </div>
  )
}

export default Input