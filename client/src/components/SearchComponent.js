import React from 'react'
import ButtonPrimary from './CommonComponents/ButtonPrimary'

const SearchComponent = ({ value, onButtonClick, onChange, placeholder, loading }) => {
    return (
        <form className='flex items-center justify-between min-w-full gap-2'>
            <input type='text' id='searchComponent' value={value} onChange={onChange} className='flex-auto h-10 px-3 rounded-lg focus:outline-pink-500' placeholder={placeholder} />
            <ButtonPrimary name="SEARCH" onClick={onButtonClick} loading={loading} disabled={!value?.trim()} />
        </form>
    )
}

export default SearchComponent