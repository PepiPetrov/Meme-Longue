import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { logout } from './api/data.js'
import { showWelcome } from './views/welcome.js'
import { showLogin } from './views/login.js'
import { showRegister } from './views/register.js'
import { showAll } from './views/all.js'
import { showDetails } from './views/details.js'
import { showCreate } from './views/create.js'
import { showEdit } from './views/edit.js'
import { showMy } from './views/my.js'


page('/', decorate, showWelcome)
page('/login', decorate, showLogin)
page('/register', decorate, showRegister)
page('/all', decorate, showAll)
page('/details/:id', decorate, showDetails)
page('/create', decorate, showCreate)
page('/edit/:id', decorate, showEdit)
page('/my', decorate, showMy)

page.start()

document.getElementById('logout').addEventListener('click', async () => {
    await logout()
    setupNav()
    page.redirect('/')
})

function decorate(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = setupNav
    ctx.showNotification = (content) => {
        document.querySelector('section').style.display = 'block'
        const notificationDiv = document.querySelector('.notification')
        notificationDiv.style.display='block'
        const span = notificationDiv.querySelector('span')
        span.style.display='block !IMPORTANT'
        span.textContent = content
        setTimeout(() => {
            document.querySelector('section').style.display = 'none'
        }, 3000)
    }
    next()
}

setupNav()

function setupNav() {
    if (sessionStorage.getItem('userId')) {
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.guest').style.display = 'none'
        document.getElementById('welcomeMsg').textContent = `Welcome, ${sessionStorage.getItem('email')}`
    } else {
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'block'
    }
}