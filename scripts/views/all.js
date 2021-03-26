import { getMemes } from "../api/data.js";
import { html } from '../../node_modules/lit-html/lit-html.js'

const template = (data = []) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${data.length>0?data.map(card):html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>
`

const card = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>
`

export async function showAll(ctx){
    const memes=await getMemes()
    ctx.render(template(memes))
}