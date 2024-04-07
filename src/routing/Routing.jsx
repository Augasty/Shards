/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';;
import Navbar from '../components/navbar/Navbar';
import TaskList from '../components/tasks/TaskList/TaskList';
import { auth } from '../firebase';
import TaskDetails from '../components/tasks/TaskDetails/TaskDetails';
import CreateTask from '../components/tasks/createTask/CreateTask';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // useEffect to trigger resetErrorBoundary once when the component mounts
  // to avoid the error when we logout from task change screen
  useEffect(() => {
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

const Routing = () => {
  const [user] = useAuthState(auth);
 
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        

            
            <Navbar />
 
            <div>

            <Routes>
              <Route path="/" element={ <TaskList />} />

              <Route path="/task/:id" element={<TaskDetails/>} />

              <Route
                path='/create-task'
                element={ <CreateTask /> }
              />

           </Routes>
            </div>
    </ErrorBoundary>
  );
};

export default Routing;
