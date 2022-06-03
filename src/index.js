import $ from 'jquery';
import _ from 'lodash';
import App from './classes/App';

$(document).ready(() =>
{
    const TwitchIDE = new App($('#app'));
});