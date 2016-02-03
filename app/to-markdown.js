import markdown from 'to-markdown';
import partial from 'lodash/partial';

let config = { 'gfm': true };
let ph = partial.placeholder = {};

export default partial(markdown, ph, config);
