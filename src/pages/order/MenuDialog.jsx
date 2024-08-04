import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import img1 from "../../assets/item1.jpeg";
import SelectMtl from "./SelectMtl";
import Counter from "./Counter";
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from "../../store/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

MenuDialog.propTypes = {
    item: PropTypes.shape({
        itemname: PropTypes.string.isRequired,
        itemprice: PropTypes.number.isRequired,
        iteminfo: PropTypes.string.isRequired
    }).isRequired,
    mtl: PropTypes.any,
    handleClose: PropTypes.func.isRequired
};
function MenuDialog({ item, mtl, handleClose }) {
    const dispatch = useDispatch()

    useEffect(() => {
        function handleClick(e) {
            if (e.target.id) {
                handleClose()
            }
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])
    const itemInfo = `$${item.itemprice} ${item.iteminfo}`

    const SELECT_COUNT = 3;
    const [userSelectedMtl, setUserSelectedMtl] = useState(new Array(SELECT_COUNT).fill(null))
    const [isAlert, setIsAlert] = useState([false, false, false])
    const handleSelectMtl = (index, item) => {
        const newUserSelectedMtl = userSelectedMtl.map((mtl, i) => {
            if (i === index) {
                return item
            }
            return mtl
        })
        setUserSelectedMtl(newUserSelectedMtl)
    }

    const SelectMtlRefs = useRef(null)
    function getMap() {
        if (!SelectMtlRefs.current) {
            // Initialize the Map on first usage.
            SelectMtlRefs.current = new Map();
        }
        return SelectMtlRefs.current;
    }

    const SelectMtlList = userSelectedMtl.map((item, i) => {
        return (
            <div key={i} ref={(node) => {
                const map = getMap();
                if (node) {
                    map.set(i, node);
                } else {
                    map.delete(i);
                }
            }}>
                <SelectMtl index={i} mtl={mtl} handleSelectMtl={handleSelectMtl} userSelectedMtl={userSelectedMtl} isAlert={isAlert[i]} />
            </div>
        )
    })
    function checkUserSelctMtl() {
        const newIsAlert = new Array(SELECT_COUNT).fill(false)
        for (let index = 0; index < SELECT_COUNT; index++) {
            if (userSelectedMtl[index] === null) {
                setIsAlert(newIsAlert.map((item, i) => {
                    if (i === index) {
                        return true
                    }
                    else return item
                }))
                handleScrollToAlert(index);
                return false
            }
        }
        return true
    }
    function handleScrollToAlert(index) {
        const map = getMap();
        const node = map.get(index);
        node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    

    
    //
    const [amount, setAmount] = useState(1)
    const handleClickPlus = () => {
        setAmount(amount + 1);
    };
    const handleClickMinus = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }



    //  Add to cart
    const handleClickAddToCart = () => {
        if (!checkUserSelctMtl()) return
        const newItem = {
            item,
            amount,
            mtl: userSelectedMtl,
        }
        dispatch(addItem(newItem))
        handleClose()
    }


    return (
        <div id="dialog" className="fixed top-0 left-0 w-screen h-screen bg-gray-600/60">
            <div className="fixed w-full h-[80vh] overflow-auto bottom-0 p-2 pb-16 left-0 rounded-t-lg bg-white">
                <div className=" h-1/5">
                    <div onClick={handleClose} className="absolute right-1 top-1 w-[36px] h-[36px] flex justify-center items-center bg-white rounded-lg"><FontAwesomeIcon icon={faXmark} size="xl" /></div>
                    <img src={img1} alt="" className="h-full w-full object-cover rounded-lg" />
                </div>
                <div className="px-2 py-4">
                    <h3 className=" font-semibold my-1">{item.itemname}</h3>
                    <p className=" font-semibold">{itemInfo}</p>
                    <div className="py-4 divide-y-2">
                        {SelectMtlList}
                    </div>
                </div>
                <div className="fixed left-0 bottom-0 bg-light-bg w-full px-8 py-3 border-t-2">
                    <div className="flex gap-8">
                        <Counter count={amount} handleClickPlus={handleClickPlus} handleClickMinus={handleClickMinus} minCount={1} />
                        <button onClick={handleClickAddToCart} className=" grow py-3 bg-button-check text-white rounded-lg font-bold">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default MenuDialog;