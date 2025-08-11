import {Routes, Route} from 'react-router-dom';
import {lazy, Suspense} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const SendMoney = lazy(() => import('./pages/SendMoney'));
const Loader = lazy(() => import('./components/Loader'));
const EditProfile = lazy(()=> import('./pages/EditProfile'))

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/dashboard" element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Loader />}><Signup /></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={<Loader />}><Signin /></Suspense>} />
        <Route path="/send" element={<Suspense fallback={<Loader />}><SendMoney /></Suspense>} />
        <Route path="/edit" element={<Suspense fallback={<Loader/>}> <EditProfile/></Suspense>}/>
      </Routes>
      
    </>
  )
}

export default App
