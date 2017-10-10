/* eslint-disable no-extend-native */
function addEscape() {
    String.prototype.escape = function() {
        if (typeof(this) === 'undefined') {
            // validator will cath it
            return this;
        }

        return this
            .trim()
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .replace(/( )(?= )/g, '&nbsp;')
            .replace(/\n/g, '<br />')
            .replace(/\t/g, '&emsp;');
    };

    String.prototype.unescape = function() {
        if (typeof(this) === 'undefined') {
            // validator will cath it
            return this;
        }

        return this
            .trim()
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, '\'')
            .replace(/&#x2F;/g, '/')
            .replace(/&nbsp;/g, ' ')
            .replace(/<br \/>/g, '\n')
            .replace(/&emsp;/g, '\t');
    };
}

export { addEscape };
