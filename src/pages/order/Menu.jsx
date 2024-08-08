import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
import MenuBar from './MenuBar'
import MenuDialog from './MenuDialog'
import { apiGetmtl } from '../../api'
import img1 from '../../assets/item1.jpeg'
import { useSpring, animated, useTransition } from '@react-spring/web';

Menu.propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    setIsDialogOpen: PropTypes.func.isRequired
};
function Menu({ isDialogOpen, setIsDialogOpen }) {
    // Add PropTypes validation
    const [menu, setMenu] = useState([])
    const [mtl, setMtl] = useState([])
    const category = menu.map((item) => {
        return {
            keyName: item.category,
            displayName: item.categoryName
        }
    })
    useEffect(() => {
        async function fetchData() {
            await apiGetmtl().then(res => {
                const newMenu = [
                    {
                        id: 1,
                        category: 'summer',
                        categoryName: '夏天系列',
                        products: res.data.summer,
                    },
                    {
                        id: 2,
                        category: 'winter',
                        categoryName: '冬天系列',
                        products: res.data.winter,
                    },
                ];
                setMenu(newMenu)
                setMtl(res.data.mtl)
            })
        }
        fetchData();
    }, [])


    /////////////////////////////


    const productsList = (products) => {
        return products.map((item) => {
            const itemInfo = `$${item.itemprice} ${item.iteminfo}`
            return (
                <button onClick={() => handleClick(item)} key={item.itemid} className='w-full py-3'>
                    <div className='flex justify-between'>
                        <div className=' flex-grow'>
                            <div className='flex flex-col items-start'>
                                <span className=' font-semibold text-lg'>{item.itemname}</span>
                                <span className=' font-semibold text-sm'>{itemInfo}</span>
                            </div>
                        </div>
                        <div className='w-[120px]'>
                            <img src={img1} alt="" className='w-full rounded-lg' />
                        </div>
                    </div>
                </button>
            )
        })
    }
    const menuListRef = useRef(null)
    function getMenuListMap() {
        if (!menuListRef.current) {
            // Initialize the Map on first usage.
            menuListRef.current = new Map();
        }
        return menuListRef.current;
    }
    const menuList = menu.map((item) => {
        return (
            <div key={item.id} className='flex flex-col gap-2 menuList' data-category={item.category}
                ref={(node) => {
                    const map = getMenuListMap();
                    if (node) {
                        map.set(item.category, {
                            ...map.get(item.category),
                            node: node,
                        });
                    } else {
                        map.delete(item.id);
                    }
                }}>
                <div className='my-1 flex items-baseline gap-2 '>
                    <span className=' text-2xl font-semibold'>{item.categoryName}</span>
                    <div className=' grow bg-black h-[2px]'></div>
                </div>
                <div className='flex flex-col my-6 divide-y-[2px] divide-solid'>
                    {productsList(item.products)}
                </div>
            </div>
        )
    })
    const [currentCategory, setCurrentCategory] = useState()
    useEffect(() => {
        const category = menu.map((item) => {
            return {
                category: item.category,
                categoryName: item.categoryName
            }
        })
        setCurrentCategory(category[0])

        // hanndle observe category in vewport 

        const targets = document.querySelectorAll('.menuList');
        if (targets.length) {
            targets.forEach(target => observer.observe(target))
        }
        return () => {
            observer.disconnect()
        }
    }, [menu])

    const handleClickCategory = (category) => {
        setCurrentCategory(category)
        const map = getMenuListMap();
        const node = map.get(category.keyName).node;
        node.scrollIntoView({ behavior: "smooth" });
    }

    const observer = new IntersectionObserver((entries) => {
        const map = getMenuListMap()
        function handleCurrentCategory() { // find the last category in viewport and set it as current category
            const newArray = Array.from(map)
            let newCategory = newArray.findLast((item) => item[1]?.isInViewport === true)[0];
            const newCurrentCategory = category.find((item) => item.keyName === newCategory)
            setCurrentCategory(newCurrentCategory)
        }
        entries.forEach(entry => {
            if (entry.isIntersecting) { // if the element is in viewport or entering the viewport
                const targetCategory = entry.target.attributes['data-category'].value;
                map.set(targetCategory, { ...map.get(targetCategory), isInViewport: true })
                handleCurrentCategory()
            }
            else { // if the element is not in viewport or leaving the viewport
                const targetCategory = entry.target.attributes['data-category'].value;
                map.set(targetCategory, { ...map.get(targetCategory), isInViewport: false })
                handleCurrentCategory()
            }
        });
    })



    const [dialogItem, setDialogItem] = useState({})
    const handleClick = (item) => {
        setIsDialogOpen(true)
        setDialogItem(item)
        document.body.style.overflow = 'hidden'
    }
    const handleClose = () => {
        setIsDialogOpen(false)
        document.body.style.overflow = 'auto'
    }
    const transitions = useTransition(isDialogOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 }
    });

    return (
        <>
            <MenuBar category={category} currentCategory={currentCategory} handleClickCategory={handleClickCategory} />
            <div className='py-1'>
                {menuList}
            </div>
            {transitions((style, isDialogOpen) => {
                return (
                    isDialogOpen && <animated.div style={style}>
                        <MenuDialog item={dialogItem} mtl={mtl} handleClose={handleClose} />
                    </animated.div>
                )
            })}
        </>
    )
}
export default Menu