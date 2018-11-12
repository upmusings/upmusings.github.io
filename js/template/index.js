function IndexTemplate(id, ...params) {
  TemplateNode.call(this, id);

  this.answer = (q) => {
    const {name, result, tables} = q;
    const {unde} = q.result;
    return {
      title: name.capitalize(),
      view: {
        header: {
          unde: `<a onclick="Ø('query').bang('${unde}')">${unde}</a>`,
          search: name,
        },
        core: `${result.long}${makeIndex(name,tables.lexicon,tables.horaire)}`
      }
    }
  }

  function makeIndex (name, lexicon, logs, stop = false) {
    let html = '';
    let children = [];

    for (let id in lexicon) {
      const term = lexicon[id];
      if (!term.unde || name != term.unde.toUpperCase()) continue;
      children[children.length] = term;
    }

    for (let id in children) {
      const child = children[id];
      const link = `<a onclick="Ø('query').bang('${child.name}')">${child.name.capitalize()}</a>`

      html += `<dt>${link}</dt><dd>${child.bref.toMarkup()}</dd></hs>
      ${!stop ? makeIndex(child.name,lexicon,logs,true) : ''}`;
    }

    return children.length > 0 ? `<dl>${html}</dl>` : '';
  }

  function makeBref (term, lexicon) {
    return `<p><a onclick="Ø('query').bang('${term.unde}')">${term.unde}</a></p>
    ${makeLinks(term.links)}

    `;
    // ${this.make_navi(term, (term.unde || ''), lexicon)}
  }

  function makeLinks (links) {
    let html = '';
    for (let id in links) {
      html += `<a class="p2 mr3 bg-noir blanc f5 lhc" href='${links[id]}' target='_blank'>${id}</a>`;
    }
    return `<div class='links'>${html}</div>`;
  }
}
