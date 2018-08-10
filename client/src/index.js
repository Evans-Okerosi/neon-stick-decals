import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/configStore';
import indexRoutes from 'routes/index';


const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <div>
  <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              key={key}
              render={props => <prop.component {...props} />}
            />
          );
        })}    
      </Switch>   
    </Router>


  </div>
  </Provider>,
  document.getElementById('root')
);
