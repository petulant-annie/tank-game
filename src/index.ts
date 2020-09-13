import { Index } from './app/game';
import './style.css';

window.onload = () => {
  const index: Index = new Index();
  console.log(index.sayHello());
};
