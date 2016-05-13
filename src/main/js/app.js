import 'bootstrap';
import '../styles/style.scss';
import Main from '../elm/Main.elm';

const container = document.getElementById('content')
Main.Main.embed(container);
