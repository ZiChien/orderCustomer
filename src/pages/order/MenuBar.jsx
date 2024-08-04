import PropTypes from 'prop-types';
import clsx from 'clsx';

MenuBar.propTypes = {
    category: PropTypes.array.isRequired,
    handleClickCategory: PropTypes.func.isRequired,
    currentCategory: PropTypes.object
};
function MenuBar({ category, currentCategory, handleClickCategory }) {
    
    const handleClick = (category) => {
        handleClickCategory(category)
    }

    const barList = category.map((category) => {
        const currentClass = clsx('',
            {
                'border-light-decoration opacity-100': category.displayName === currentCategory?.displayName,
                'opacity-50': category.displayName !== currentCategory?.displayName
            })
        return (
            <button key={category.displayName} onClick={() => handleClick(category)}>
                <div className={`${currentClass} inline-block pb-1 font-bold text-base border-b-4 text-light-title`}>
                    {category.displayName}
                </div>
            </button>
        )
    })
    return (
        <div className=' sticky top-0 w-full flex gap-4 bg-light-bg py-6'>
            {barList}
        </div>
    )
}


export default MenuBar