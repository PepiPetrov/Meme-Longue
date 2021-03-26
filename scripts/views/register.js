import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/api.js'

const template = (onSubmit, errorMsg) => html`
${errorMsg ? html`
<section id="notifications">
    <div id="errorBox" class="notification" style="display:block">
        <span>${errorMsg}</span>
    </div>
</section>`: ''}
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export function showRegister(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [username, email, password, repeatPass, gender] = [...new FormData(e.target).entries()].map(x => x[1])
        if (username.trim() == '' || email.trim() == '' || password.trim() == '' || repeatPass.trim() == '') {
            ctx.showNotification('All fields are required!')
            return
        }

        if(password!==repeatPass){
            ctx.showNotification('Passwords don\'t match!')
            return
        }

        await register(username,email,password,gender)
        ctx.setupNav()
        ctx.page.redirect('/all')
    }
}