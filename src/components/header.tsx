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
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import UserService from '../helpers/UserService';
import { Icon, Pivot, PivotItem, IconButton, IContextualMenuProps, IContextualMenuListProps, IRenderFunction, ContextualMenuItemType, ActionButton } from '@fluentui/react';
import { AppState } from '../stores/appstate';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Logo from './logo';
interface IProp extends RouteComponentProps {
  href: string;
  hidePivot?: boolean;
  appTitle?: string;
}

const pivots = ['Dashboard', 'App Store', 'Data Catalog', 'Digital Twins', 'Semantic Hub', 'Developer Hub', 'Connector'];
const keys = pivots.map((p) => p.toLowerCase().replace(' ', ''));

function changeLanguage(lang: string)
{
}

@observer
class Header extends React.Component<IProp> {
  @observable username = '';
  @observable name = '';
  @observable initials = '';
  @observable company = '';
  @observable selectedKey = '';
  @observable isAdmin = false;
  @observable language = 'EN';
  @observable profileMenuVisible = true;

  public async componentDidMount() {
    this.name = UserService.getName();
    this.initials = UserService.getInitials();
    this.company = UserService.getCompany();
    AppState.state.isAdmin = true;

    //Removed beacuse of login loop
    // if (adalContext.getDomain(adalContext.getUsername()) === 'Daimler') { // Hack for MS Graph
    //   AppState.state.isAdmin = true;
    // } else if (AppState.state.isAdmin === undefined) {
    //   AppState.state.isAdmin = false;
    //   try {
    //     const groups = await adalContext.getGroups();
    //     if (groups) {
    //       for (const g of groups.value) {
    //         const group = g as string;
    //         if (group === 'ec5a8b75-4839-4ff1-b50d-f8159653d9f0' || group === '463512e5-968f-4b2d-8283-737be4a67182') {
    //           AppState.state.isAdmin = true;
    //         }
    //       }
    //     }
    //   } catch { }
    // }

    this.isAdmin = AppState.state.isAdmin;
  }

  private pivotClick(item: PivotItem): void {
    this.selectedKey = item.props.headerText.replace(' ', '').toLowerCase();
    this.props.history.push(`/home/${this.selectedKey}`);
  }

  private homeClick(): void {
    this.props.history.push('/home/dashboard');
  }

  private userClick() {
    const token = UserService.getCachedToken();
    console.log(token);
  }
  private logoutClick() {
    const token = UserService.getCachedToken();
    console.log(token);
    UserService.logOut();
  }

  private menuProps: IContextualMenuProps = {
    onRenderMenuList: (menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) => {
      console.log(menuListProps)
      return (
        <div className='df fdc'>
          <div className='p10' style={{ borderBottom: '1px solid #ccc' }}>
            <div>{this.name}</div>
            <div className='df'>
            <div> {UserService.getCompany()}</div>
              {this.isAdmin && <span className='ml5 fs14'>(Admin)</span>}
            </div>
          </div>
          {menuListProps.items.map((it) => <ActionButton className='fgwhite ml10' key={it.key}>{it.text}</ActionButton>)}
          {/* {defaultRender(menuListProps)} */}
        </div>
      );
    },
    isBeakVisible: true,
    styles: { root: { background: '#2373CB', color: 'white' }, container: { color: 'white' } },
    calloutProps: {styles:{beak: {backgroundColor: '#2373CB'}}},
    items: [
      {
        key: 'account',
        text: 'My Account',
      },
      {
        key: 'notifications',
        text: 'Notifications',
      },
      {
        key: 'user',
        text: 'User Management',
      },
      {
        key: 'logoff',
        text: 'Sign out',
      }
    ]
  };



  private onBoardingClick() {
    this.props.history.push('/invite');
  }

  public render() {
    const href = window.location.href;
    const path = href.substr(href.lastIndexOf('/') + 1);
    let key = String(keys.indexOf(path));
    if (href.includes('semanticmodel')) key = '4'; //just hack - nav code here needs to be cleaned up!
    if (href.includes('digitaltwin')) key = '3'; //just hack - nav code here needs to be cleaned up!
    return (
      <div className='w100pc minh80 df aic bgwhite'>
        <div className='df cpointer' onClick={() => this.homeClick()}>
          <Logo />
        </div>
        {this.props.appTitle && <div className='df aic'>
          <Icon className='fs14 bold fgblack' iconName='ChromeMinimize' />
          <div className='fs16 bold fgblack ml10 mb4'>{this.props.appTitle}</div>
        </div>}
        <div className='flex1' />
        {!this.props.hidePivot && <Pivot selectedKey={key} className='px30' aria-label='Header' onLinkClick={(item) => this.pivotClick(item)}>
          {pivots.map((p) => {
            return <PivotItem key={p.toLowerCase().replace(' ', '')} className='ml20 mr20' headerText={p} />
          })}
          {/* <PivotItem key='search' className='ml20 mr20' headerText='' itemIcon='search' /> */}
        </Pivot>}
        {/* { this.isAdmin &&  <div className='cpointer' onClick={() => this.onBoardingClick()}>Invite Business Partner</div> } */}
        <div className='flex1' />
        <div className='df aic'>
          <div className='df flex1 fdr jcfe mr20'><div className='cpointer fgblue' onClick={()=> this.props.history.push('/home/help')}>Help</div></div>
          <IconButton menuProps={this.menuProps} menuIconProps={{
            iconName: 'Contact',
            style: {
              fontWeight: 'bold',
              fontSize: 18,
              backgroundColor: '#2373CB',
              color: 'white', padding: 10, borderRadius: 25
            }
          }} className={'bgwhite profile_icon'}/>
          <div className='fgblue ml20'><span className={this.language === 'de' ? 'lang-sel' : ''} onClick={() => changeLanguage('de')} > DE</span></div>
          <div className='ml5 mr50'><span className='tdu' onClick={() => changeLanguage('en')} > EN </span></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
