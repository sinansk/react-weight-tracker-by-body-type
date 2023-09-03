import React from 'react'
import ButtonPrimary from './CommonComponents/ButtonPrimary'
import { FaSearch } from "react-icons/fa"
const SearchComponent = ({ className, value, onButtonClick, onChange, onBlur, onFocus, placeholder, loading, haveButton = true }) => {

    return (
        <form onMouseEnter={onFocus} onMouseLeave={onBlur} className={`${className} flex items-center justify-between w-full gap-2 sm:gap-3`}>
            <input onFocus={onFocus} type='text' id='searchComponent' value={value} onChange={onChange} className='flex-auto h-8 px-3 text-gray-200 rounded-lg outline-none focus:bg-transparent bg-gray-500/50 sm:h-10 focus:outline-teal-500' placeholder={placeholder} />
            {/* <ButtonPrimary onClick={onButtonClick} loading={loading} disabled={!value?.trim()} className={``}>SEARCH</ButtonPrimary> */}
            {haveButton && (
                <button onClick={onButtonClick} type='button'>
                    <FaSearch className='text-teal-500 hover:text-teal-400 h-7 sm:h-9' size={36} />
                </button>
            )}
        </form>
    )
}

export default SearchComponent