export default `
<div class="{{css.card}}">
    {{#if title}}
        <div class="{{css.card-header}}">
            <h1 class="{{css.card-title}}">{{title}}</h1>
        </div>
        {{> hr}}
    {{/if}}
    {{#if title}}
        <div class="{{css.card-content}}">
            {{{content}}}
        </div>
    {{/if}}
</div>
`;
