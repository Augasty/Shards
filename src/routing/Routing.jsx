/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import TaskList from '../components/tasks/TaskList/TaskList';
import TaskDetails from '../components/tasks/TaskDetails/TaskDetails';
import CreateTask from '../components/tasks/createTask/CreateTask';

function ErrorFallback({ error, resetErrorBoundary }) {
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
}

const Routing = () => {
 
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        

            

            <div>

            <Routes>
              <Route path="/" element={ 
                <>
                            <Navbar />
            <TaskList />
                </>


              } />

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
