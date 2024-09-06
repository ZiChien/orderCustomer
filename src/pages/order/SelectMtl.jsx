import clsx from 'clsx';
import { useState } from 'react';
function SelectMtl({ index, attributes, handleSelectOption, userSelectedAttributes, isAlert }) {
    const filterOnSupply = attributes.options.filter((item) => item.status === true)
    const optionList = filterOnSupply.map((item) => {
        const selectClass = clsx({
            ' bg-button-check border-button-check-border text-white': userSelectedAttributes[index] !== null ? userSelectedAttributes[index].optionId === item.optionId : false,
        })
        return (
            <button onClick={() => handleClick(item)} key={item.optionId} className={'p-2 px-4 text-sm border-2 rounded-lg border-button-border' + selectClass}>
                <span className=" font-medium">{item.optionDisplayName}</span>
            </button>
        )
    })
    const handleClick = (item) => {
        handleSelectOption(index, item)
    }

    const alertDivClass = clsx({
        ' outline outline-2 outline-red-900 bg-alertBG': isAlert
    })
    return (
        <div className="py-4 flex flex-col gap-3">
            <span className={clsx('font-medium text-sm ', { 'text-red-700': isAlert })}>{attributes.attributeDisplayName} {attributes.attributeDescription}</span>
            <div className={`flex p-2 gap-2 flex-wrap rounded-lg ${alertDivClass}`}>
                {optionList}
            </div>
        </div>
    )
}

export default SelectMtl