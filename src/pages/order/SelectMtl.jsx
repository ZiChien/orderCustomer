import clsx from 'clsx';
import { useState } from 'react';
function SelectMtl({ index, mtl, handleSelectMtl, userSelectedMtl, isAlert }) {
    const filterOnSupply = mtl.filter((item) => item.onsupply === true)
    const mtlList = filterOnSupply.map((item) => {
        const selectClass = clsx({
            ' bg-button-check border-button-check-border text-white': userSelectedMtl[index] !== null ? userSelectedMtl[index].id === item.id : false,
        })
        return (
            <button onClick={() => handleClick(item)} key={item.id} className={'p-2 px-4 text-sm border-2 rounded-lg border-button-border' + selectClass}>
                <span className=" font-medium">{item.name}</span>
            </button>
        )
    })
    const handleClick = (item) => {
        handleSelectMtl(index, item)
    }

    const alertDivClass = clsx({
        ' outline outline-2 outline-red-900 bg-alertBG': isAlert
    })
    return (
        <div className="py-4 flex flex-col gap-3">
            <span className={clsx('font-medium text-sm ', { 'text-red-700': isAlert })}>(配料{index + 1})*請至少選擇一種</span>
            <div className={`flex p-2 gap-2 flex-wrap rounded-lg ${alertDivClass}`}>
                {mtlList}
            </div>
        </div>
    )
}

export default SelectMtl