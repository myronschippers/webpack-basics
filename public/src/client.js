import $ from 'jquery';
import helloWorld from './helloWorld';

$(document).ready(init);

function init() {
  console.log('Page is Loaded');
  console.log('More to Say.....');
  helloWorld();
}

console.log('HELLO URSUS!!!');