import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../api/data.js";

const template = (onSubmit, errorMsg) => html`
<section id="create-meme">
    ${errorMsg ? html`
    <section id="notifications">
        <div id="errorBox" class="notification" style="display:block">
            <span>${errorMsg}</span>
        </div>
    </section>`: ''}
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`

export function showCreate(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get('title').trim()
        const description = data.get('description').trim()
        const imageUrl = data.get('imageUrl').trim()
        if (title == '' || description == '' || imageUrl == '') {
            ctx.showNotification('All fields are required!')
            return
        }
        await createMeme({ title, description, imageUrl })
        ctx.page.redirect('/all')
    }
}