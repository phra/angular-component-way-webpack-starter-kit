import angular                  from 'angular';
import '@angular/router/angular1/angular_1_router';
import 'angular-resource';

import FastClick                from 'fastclick';

import Configs                  from './Config';

import HeaderComponent          from '../Header/HeaderComponent';
import FooterComponent          from '../Footer/FooterComponent';

import HomeComponent            from '../../Home/HomeComponent';

import TitleProvider            from './TitleProvider';

import APIFactory               from './APIFactory';

import PointerEventsDirective   from './PointerEventsDirective';

import resetStyles              from './styles/reset.scss';
import fontStyles               from './styles/fonts.scss';
import globalStyles             from './styles/globals.scss';

import appStyles                from './AppStyles.scss';

const styles = Object.assign(resetStyles, fontStyles, globalStyles, appStyles);

const topLevelComponents = [
  HeaderComponent,
  FooterComponent,
  HomeComponent
];

const topLevelProviders = [
  TitleProvider
];

const topLevelFactories = [
  APIFactory
];

const topLevelDirectives = [
  PointerEventsDirective
];

const $body = document.body;

const Config = ($locationProvider) => { 'ngInject';
  $locationProvider.html5Mode(Configs.isHTML5);
};

const Runners = () => { 'ngInject';

};

const TITLE = new WeakMap();

class controller {
  constructor(title) { 'ngInject';
    TITLE.set(this, title);

    this.$routerOnActivate = () => {
      new FastClick($body);
      TITLE.get(this).setTitle();
    };
  }
}

const Component = {
  template: require('./AppView.jade')(styles),
  controllerAs: 'App',
  controller,
  $routeConfig: [
    {
      path: '/...',
      name: 'Home',
      component: 'home',
      useAsDefault: true
    }
  ]
};

angular
  .module('App', ['ngComponentRouter', 'ngResource'])
  .constant('Config', Configs)
  .config(Config)
  .run(Runners)
  .value('$routerRootComponent', 'app')
  .component('app', Component);

const modules = ['App'].concat(topLevelComponents, topLevelProviders, topLevelFactories, topLevelDirectives);

angular.bootstrap($body, modules);
