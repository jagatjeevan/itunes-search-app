import loginTemplate from './login.tpl.html';
import {setAuthToken} from '../../utils';
import emitter from '../../emitter';
import state from '../../state';
import './Login.css';

class Login{
    constructor(){
        this.removeEventListener();
    }
    async login(){
        try{
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const url = 'https://dry-temple-99897.herokuapp.com/api/accounts/login';
            const resp = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            });
            const json = await resp.json();
            setAuthToken(json.token);
            state.activeView = 'search';
            state.isLoggedIn = true;
            state.isGuest = false;
            emitter.emit('viewChange', 'search');
        } catch(e){

        }

    }
    async signup(){
        try{
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const url = 'https://dry-temple-99897.herokuapp.com/api/accounts/signup';
            const resp = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            });
            const json = await resp.json();
            setAuthToken(json.token);
            state.activeView = 'search';
            state.isLoggedIn = true;
            state.isGuest = false;
            emitter.emit('viewChange', 'search');
        } catch(e){

        }
    }
    onClick(e){
        if(e.target.id === 'btn-signup'){
            e.preventDefault();
            this.signup();
        }
        else if (e.target.id === 'btn-login'){
            e.preventDefault();
            this.login();            
        }
    }
    attachEventListener(){
        document.querySelector('#search_result').addEventListener('click', this.onClick.bind(this));
    }
    removeEventListener(){
        document.querySelector('#search_result').removeEventListener('click', this.onClick.bind(this));
    }
    render(){
        this.attachEventListener();
        return loginTemplate();
    }
}

export default Login;