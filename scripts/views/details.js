import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMeme, deleteMeme } from '../api/data.js'

const template = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${meme._ownerId == sessionStorage.getItem('userId') ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${onDelete} id=${meme._id}>Delete</button>` : ''}

        </div>
    </div>
</section>
`

export async function showDetails(ctx) {
    const id = ctx.params.id
    const meme = await getMeme(id)
    ctx.render(template(meme,onDelete))
    async function onDelete(e){
        const memeId=e.target.id
        if(confirm('Are you sure')){
            await deleteMeme(memeId)
            ctx.page.redirect('/all')
        }
    }
}