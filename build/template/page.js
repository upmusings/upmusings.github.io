const Template = require('./template');
const Aequirys = require('aequirys');

const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const displayDate = d => new Aequirys(d).display();
const hoverDate = d => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

module.exports = function ({term, unde, type, line}, data) {
  Template.call(this, {term, unde, type, line});
  this.path = `./wiki/${this.filename}.html`;

  const sectors = {
    'DV': 'Development',
    'MN': 'Maintenance',
    'RE': 'Research',
    'PY': 'Physical',
    'VI': 'Visual',
    'AU': 'Audio'
  }

  /**
   * Build Summary
   * @return {string} Summary
   */
  function _summary () {
    const sv = data.sortValues();
    const sd = data.logs[0].start;
    const ed = data.logs.slice(-1)[0].end;

    let html = [
      '<div id="l">',
      `<span title="${hoverDate(sd)}&ndash;${hoverDate(ed)}">`,
      `${displayDate(sd)}&ndash;${displayDate(ed)}</span>`,
      ` &middot; ${data.lh.toFixed(2)} h`
    ].join('');

    for (let i = 0, l = sv.length; i < l; i++) {
      const {h, n} = sv[i];
      html += ` &middot; ${h.toFixed(2)} <span title="${sectors[n]}">${n}</span>`;
    }

    return `${html}</div>`;
  }

  /**
   * Render Page
   * @return {string} Content
   */
  this.render = () => {
    return [
      this.head(),
      this.header(),
      '<main>',
      data.logs.length > 0 ? _summary() : '',
      this.core(),
      '</main>',
      this.footer(),
      this.search()
    ].join('');
  }
}
