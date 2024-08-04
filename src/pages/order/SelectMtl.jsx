import clsx from 'clsx';
import { useState } from 'react';
function SelectMtl({ index, mtl, handleSelectMtl, userSelectedMtl, isAlert }) {
    const mtlList = mtl.map((item) => {
        const selectClass = clsx({
            ' bg-button-check border-button-check-border text-white': userSelectedMtl[index] !== null ? userSelectedMtl[index].id === item.id : false,
        })
        return (
            <button onClick={() => handleClick(item)} key={item.id} className={'p-2 px-4 border-2 rounded-lg border-button-border' + selectClass}>
                <span className=" font-semibold">{item.name}</span>
            </button>
        )
    })
    const handleClick = (item) => {
        handleSelectMtl(index, item)
    }

    const alertDivClass = clsx({
        ' outline outline-1 outline-red-900 bg-alertBG': isAlert
    })
    return (
        <div className="py-4 flex flex-col gap-2">
            <span className={clsx('font-semibold ', { 'text-red-700': isAlert })}>(配料{index + 1})*請至少選擇一種</span>
            <div className={`flex gap-2 flex-wrap p-2 rounded-lg ${alertDivClass}`}>
                {mtlList}
            </div>
        </div>
    )
}

export default SelectMtl