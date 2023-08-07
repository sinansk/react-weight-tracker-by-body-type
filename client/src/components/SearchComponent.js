import React from 'react'
import ButtonPrimary from './CommonComponents/ButtonPrimary'

const SearchComponent = ({ className, value, onButtonClick, onChange, onBlur, onFocus, placeholder, loading }) => {
    return (
        <form onMouseEnter={onFocus} onMouseLeave={onBlur} className={`${className} flex items-center justify-between w-full gap-2`}>
            <input onFocus={onFocus} type='text' id='searchComponent' value={value} onChange={onChange} className='flex-auto h-10 px-3 rounded-lg focus:outline-pink-500' placeholder={placeholder} />
            <ButtonPrimary text="SEARCH" onClick={onButtonClick} loading={loading} disabled={!value?.trim()} />
        </form>
    )
}

export default SearchComponent