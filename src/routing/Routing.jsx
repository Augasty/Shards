/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import ShardDetails from "../components/Shards/ShardDetails/ShardDetails";
import CreateShard from "../components/Shards/createShard/CreateShard";
import { auth } from "../firebase";
import ShardList from "../components/Shards/ShardList/ShardList";
import SignedOutHomePage from "../components/SignedOutHomePage";

import { useAuthState } from "react-firebase-hooks/auth";
import Blogpost from "../components/Blogs/Blogpost";

function ErrorFallback({ error, resetErrorBoundary }) {
  // useEffect to trigger resetErrorBoundary once when the component mounts
  // to avoid the error when we logout from Shard change screen
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
  const [user] = useAuthState(auth);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar />
      <div>
        {user ? (
          <>
            
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ShardList />
                  </>
                }
              />

              <Route path="/Shard/:id" element={<ShardDetails />} />
              <Route path="/Shard/:id/create-shard" element={<CreateShard />} />
              <Route path="/create-shard" element={<CreateShard />} />
              <Route path="/Blog/:id" element={<Blogpost />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/Blog/:id" element={<Blogpost />} />

            <Route path="*" element={<SignedOutHomePage />} />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Routing;
