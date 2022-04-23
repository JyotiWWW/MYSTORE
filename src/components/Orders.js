import React, {Suspense} from 'react';
import ErrorBoundary from './ErrorBoundary'
import Loader from './Loader';


const LazyComponent= React.lazy(()=>{
    return new Promise(resolve => setTimeout(resolve, 5 * 1000)).then(
        () =>
          Math.floor(Math.random() * 10) >= 4
            ? import("./OtherComponent")
            : Promise.reject(new Error())
      );
});

function Orders() {
  return (
    <div>
        <ErrorBoundary>
            <Suspense fallback={ <Loader/>}>
            <LazyComponent/>
            </Suspense>
        </ErrorBoundary>
    </div>
  )
}

export default Orders