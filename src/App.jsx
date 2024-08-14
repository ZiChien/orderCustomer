import './App.css'
import { Outlet } from 'react-router-dom'
import { useTransition, animated } from '@react-spring/web';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    from: { opacity: 0, },
    enter: { opacity: 1, },
    // leave: { opacity: 0, },
    // exitBeforeEnter: true,
    config: { duration: 300 },
    keys: location.pathname,
    // onRest: (result, ctrl, item) => {
    //   // 当旧页面的 leave 动画完成时才让新页面开始 enter 动画
    //   if (result.key === item) {
    //     ctrl.start({ opacity: 1, transform: 'translateY(0px)' });
    //   }
    // }
  })
  return (
    transitions((style, location) => {
      return (
        <animated.div style={{ ...style, position: 'absolute', width: '100vw' }}>
          <Outlet />
        </animated.div>
      )
    })
  )
}

export default App
