import React from 'react'
import ButtonPrimary from './CommonComponents/ButtonPrimary'
import { FaSearch } from "react-icons/fa"
const SearchComponent = ({ className, value, onButtonClick, onChange, onBlur, onFocus, placeholder, loading }) => {
    return (
        <form onMouseEnter={onFocus} onMouseLeave={onBlur} className={`${className} flex items-center justify-between w-full gap-2 sm:gap-3`}>
            <input onFocus={onFocus} type='text' id='searchComponent' value={value} onChange={onChange} className='flex-auto h-8 sm:h-10 px-3 rounded-lg focus:outline-pink-500' placeholder={placeholder} />
            {/* <ButtonPrimary onClick={onButtonClick} loading={loading} disabled={!value?.trim()} className={``}>SEARCH</ButtonPrimary> */}
            <button onClick={onButtonClick}>
                <FaSearch className='text-slate-600 hover:text-pink-500 h-7 sm:h-9' size={36} />
            </button>
        </form>
    )
}

export default SearchComponent