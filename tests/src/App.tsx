// Copyright (c) 2021 Microsoft
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';
import { initializeIcons, loadTheme } from '@fluentui/react';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './styles/App.css';
import Home from './components/home';
import DataUpload from './components/apps/dataupload';
import DataUpload2 from './components/apps/dataupload2';
import Registration from './components/registration/register';
import VerifyCompany from './components/registration/verifycompany';
import Registrationoneid from './components/registrationoneid';
import Emailregister from './components/emailregister';
import { AppState } from './stores/appstate';
import Login from './components/login';
import Authinfo from './components/authinfo';
const history = createBrowserHistory();

@observer
export default class App extends React.Component {
  private static first = true;
  constructor(props: any) {
    super(props);
    if (App.first) {
      initializeIcons();
      loadTheme({ palette: { themePrimary: '#BAC938', themeDarkAlt: '#E6AA1E' } })
    }

    AppState.state = new AppState();

    App.first = false;
  }

  public render() {
    return (
      <Router history={history}>
        <Switch>
          <Redirect path='/' exact to='/home/dashboard' />
          <Route path='/home' render={(props) => <Home />} />
          <Route path='/registration' component={(props) => <Registration {...props} />} />
          <Route path='/register' component={(props) => <Registration {...props} />} />
          <Route path='/verifyoneid' component={(props) => <VerifyCompany {...props} />} />
          <Route path='/dataupload' render={() => <DataUpload />} />
          <Route path='/dataupload2' render={() => <DataUpload2 />} />
          <Route path='/invite' component={(props) => <Registrationoneid {...props} />} />
          <Route path='/emailregister' component={(props) => <Emailregister {...props} />} />
          <Route path='/login' component={(props) => <Login {...props} />} />
          <Route path="/authinfo" component={(props) => <Authinfo />} />
        </Switch>
      </Router>
    );
  }
}