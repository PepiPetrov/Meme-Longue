import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<section id="login">
    ${errorMsg ? html`
    <section id="notifications">
        <div id="errorBox" class="notification" style="display:block">
            <span>${errorMsg}</span>
        </div>
    </section>`: ''}
    <form id="login-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export function showLogin(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const email = data.get('email').trim()
        const password = data.get("password").trim()
        if (email == '' || password == '') {
            ctx.showNotification('All fields are required!')
            return
        }
        try {
            await login(email, password)
            ctx.setupNav()
            ctx.page.redirect('/all')
        }catch(e){
            ctx.showNotification(e.message)
        }
    }
}