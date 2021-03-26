import { html } from '../../node_modules/lit-html/lit-html.js'
import { editMeme, getMeme } from '../api/data.js'

const template = (meme, onSubmit, errorMsg) => html`
<section id="edit-meme">
    ${errorMsg ? html`
    <section id="notifications">
        <div id="errorBox" class="notification" style="display:block">
            <span>${errorMsg}</span>
        </div>
    </section>`: ''}
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" .value=${meme.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export async function showEdit(ctx) {
    const id = ctx.params.id
    const meme = await getMeme(id)
    ctx.render(template(meme, onSubmit))
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
        await editMeme(id, { title, description, imageUrl })
        ctx.page.redirect('/details/'+id)
    }
}