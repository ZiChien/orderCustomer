import { useState } from 'react'
import Switch from '@mui/material/Switch'
import { useDispatch,useSelector } from 'react-redux';
import { setTableware } from '../../store/orderSlice';

export default function Tableware() {
    const dispatch = useDispatch()
    const isNeedTableware = useSelector(state => state.order.tableware)
    const handleChange = () => {
        dispatch(setTableware(!isNeedTableware))
    }
    return (
        <div className='flex justify-between items-center p-4'>
            <div><span className='text-base font-bold'>需要為您準備餐具嗎？</span></div>
            <div>
                <Switch
                    checked={isNeedTableware}
                    onChange={handleChange}
                    sx={{
                        'width': '42px',
                        'height': '29px',
                        'padding': '0',
                        '& .MuiSwitch-thumb': {
                            borderRadius: "5px",
                            width: '18px',
                            height: '18px',
                        },
                        '& .MuiSwitch-track': {
                            backgroundColor: '#bdbdbd',
                        },
                        '& .MuiButtonBase-root': {
                            padding: '5px',
                        },
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                transform: 'translateX(14px)',
                                color: '#83684e',
                                '& + .MuiSwitch-track': {
                                    backgroundColor: '#aba69f',
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}