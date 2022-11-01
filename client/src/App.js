import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
        <li>
            <Link to='/'>HomePage</Link>
          </li>
          <li>
            <Link to='/rasabot'>Chatbot</Link>
          </li>
          <li>
            <Link to='/object_detection'>imageobjectdetection</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {publicRoutes.map((route, index) => {
          
          let Layout = DefaultLayout;

          if ( route.layout ) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;

          return <Route 
                  key={index} 
                  path={route.path} 
                  element={
                    <Layout>
                      <Page />
                    </Layout>} />;
          })}
      </Routes>
    </div>
    </Router>
  );
}

export default App;