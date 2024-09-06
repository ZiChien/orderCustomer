import { useEffect } from 'react';
import './App.css'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { useTransition, animated } from '@react-spring/web';
import { useQuery, gql } from '@apollo/client';

function App() {
  const location = useLocation()
  const { merchant } = useParams()
  const GET_ALL_MERCHANTS = gql`
    query GetAllMerchants {
      getAllMerchants {
        id
        name
        displayName
        address
        phone
      }
    }
  `
  const { data, loading, error } = useQuery(GET_ALL_MERCHANTS)
  useEffect(() => {
    if (!error && data) {
      const merchants = data.getAllMerchants
      if (merchants.find((item) => item.name === merchant) === undefined) {
        throw new Response("Merchant not Found", { status: 404 });
      }
    }


  }, [data, error])

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
