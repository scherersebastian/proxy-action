/// Copyright (c) 2021 Microsoft
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
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Pivot, PivotItem } from '@fluentui/react';
import SetUpConnectors from './setupconnector';
import ConnectorOverview from './connectoroverview';

@observer
class MyConnectors extends React.Component<RouteComponentProps> {

  public render() {
    const key = window.location.href.indexOf('?tab=3') >= 0 ? 'three' : 'one';
    return (
      <div className='w100pc h50 df aic bgwhite'>
        <Pivot className='px30 h100pc w100pc' aria-label='Header' defaultSelectedKey={key}>
          <PivotItem itemKey='one' className='mr20' headerText='Overview'>
            <ConnectorOverview />
          </PivotItem>
          <PivotItem itemKey='two' className='mr20' headerText='Manage Connections'>
            <div className='df fdc aic'>
              <img className='mt100' src='/comingsoon.png' width='570' height='270' alt='Coming Soon' />
            </div>
          </PivotItem>
          <PivotItem itemKey='three' className='mr20' headerText='Set Up Connector'>
            <SetUpConnectors />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}

export default withRouter(MyConnectors);