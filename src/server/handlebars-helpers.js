const moment = require( 'moment' );
module.exports = function({ handlebars }) {
    handlebars.registerHelper("encodeURI", encodeURIComponent);
    handlebars.registerHelper("capitalize", (s) => s.charAt(0).toUpperCase() + s.slice(1));
    handlebars.registerHelper("add", (a, b) => Number(a) + Number(b));
    handlebars.registerHelper("subtract", (a, b) => Number(a) - Number(b));
    handlebars.registerHelper("length", (a) => a.length);
    handlebars.registerHelper("moment", (date, format) => moment(date).format(format));
    handlebars.registerHelper("eq", (a, b, options) => {
        return a === b ? options.fn( this ) : options.inverse(this);
    });
};
