import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx';
import PropTypes from 'prop-types';

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  handleClickMinus: PropTypes.func.isRequired,
  handleClickPlus: PropTypes.func.isRequired,
  minCount: PropTypes.number.isRequired
};
function Counter({ count, handleClickMinus, handleClickPlus, minCount }) {

  return (
    <div className='inline-flex items-center gap-2'>
      <button disabled={count <= minCount} onClick={handleClickMinus} className={clsx('flex justify-center items-center border-[1px] border-black rounded-full w-[32px] h-[32px]', { 'opacity-50': count <= minCount })}>
        <FontAwesomeIcon icon={faMinus} size='sm' className='' />
      </button>
      <span className=' font-semibold'>{count}</span>
      <button onClick={handleClickPlus} className='flex justify-center items-center border-[1px] border-black rounded-full w-[32px] h-[32px]'>
        <FontAwesomeIcon icon={faPlus} size='sm' className='' />
      </button>
    </div>
  );
}


export default Counter;