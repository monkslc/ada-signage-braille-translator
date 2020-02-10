const brailleMappings = require('./braille-mappings');

module.exports = function translate(originalText) {
	let braille = (' ' + originalText).slice(1);

	let regexCapLetterDigit = new RegExp('([\\d][.]*)([A-Z]+)', 'g');
	braille = braille.replace(regexCapLetterDigit, function(math, p1, p2){
		if(p2.length > 1){
			return p1 + ';,,' + p2;
		} else{
			return p1 + ';,' + p2;
		}
	});

	// lower case letters in room identifers should stay lowercase
	let regexLetterDigit = new RegExp('([\\d][.]*)([a-z])', 'g');
	braille = braille.replace(regexLetterDigit, '$1;$2');

	// adding leading and trailing white space to make regex simpler
	braille = ' ' + braille.toLowerCase() + ' ';

	// loop through and do all the regex mappings
	for(let mapping of brailleMappings){
		const regex = mapping['regex'];
		const replacementExpression = mapping['replacementExpression'];
		for(let index in mapping['keys']) {
			const replacementKey = mapping['keys'][index];
			const replacementValue = mapping['replacements'][index];
			braille = braille.replace(regex(replacementKey), replacementExpression(replacementValue));
		}
	}

	return braille.trim();
};
