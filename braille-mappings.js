const hardCodedReplacements = {
	keys: ['fr.'],
	replacements: [';fr.'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const symbols = {
	keys: ['/', '#'],
	replacements: ['_/', '_?#'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

// do this so we can later identify numbers as anything with a pound or decimal point before them
const addPound = {
	keys: [''],
	replacements: [''],
	regex: function(){return new RegExp('([^\\d#.])([\\d])', 'g');},
	replacementExpression: function(){return '$1#$2';}
};

const questionMark = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('([^_])[?]', 'g');},
	replacementExpression: () => {return '$18';}
};
const exclamationPoint = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('!', 'g');},
	replacementExpression: () => {return '6';}
};
const period = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('([^\\d])[.]((?=[^\\d#]))', 'g');},
	replacementExpression: () => {return '$14$2';}
};

const accentLetters = {
	keys: ['à', 'á', 'â', 'ä', 'ã', 'å', 'ā', 'è', 'é', 'ê', 'ë', 'ē','ę', 'î', 'ï', 'í', 'ī', 'į', 'ì', 'ô', 'ö', 'ò', 'ó','ø', 'ō', 'õ', 'û', 'ü', 'ù', 'ú', 'ū'],
	replacements: ['^*a', '^/a', '^%a', '^3a', '^]a', '^$a', '@-a', '^*e', '^/e', '^%e', '^3e', '@-e', '^&e', '^%i', '^3i', '^/i', '@-i', '^@i', '^*i', '^%o', '^3o', '^*o', '^/o','@*o', '@-o', '^]o', '^%u', '^3u', '^*u', '^/u', '@-u'],
	regex:  keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const standaloneLetters = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('([\\s-])([A-Za-z])([\\s-.])', 'g');},
	replacementExpression: () => {return '$1;$2$3';}
};

const alphabeticWordSigns = {
	keys: ['but', 'can', 'do', 'every', 'from', 'go', 'have', 'just', 'knowledge', 'like', 'more', 'not', 'people', 'quite', 'rather', 'so', 'that', 'us', 'very', 'will', 'you', 'as'],
	replacements: ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'],
	regex: standAloneRegEx,
	replacementExpression: standAloneReplacementExpression
};

const shortFormWords = {
	keys: ['about', 'above', 'according', 'afternoon', 'afterward', 'after', 'against', 'again', 'almost', 'already', 'also', 'although', 'altogether', 'always', 'because', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'blind', 'braille', 'children', 'conceive', 'conceiving', 'could', 'deceive', 'deceiving', 'declare', 'declaring', 'either', 'first', 'friend', 'good', 'great', 'herself', 'himself', 'him', 'immediate', 'itself', 'its', 'letter', 'little', 'much', 'must', 'myself', 'necessary', 'neither', 'oneself', 'ourselves', 'paid', 'perceive', 'perceiving', 'perhaps', 'quick', 'receiving', 'receive', 'rejoice', 'rejoicing', 'said', 'should', 'such', 'themselves', 'thyself', 'today', 'together', 'tomorrow', 'tonight', 'would', 'yourselves', 'yourself', 'your'],
	replacements: ['ab', 'abv', 'ac', 'afn', 'afw', 'af', 'agst', 'ag', 'alm', 'alr', 'al', 'alth', 'alt', 'alw', 'bec', 'bef', 'beh', 'bel', 'ben', 'bes', 'bet', 'bey', 'bl', 'brl', 'chn', 'concv', 'concvg', 'cd', 'dcv', 'dcvg', 'dcl', 'declg', 'ei', 'fst', 'fr', 'gd', 'grt', 'herf', 'hmf', 'hm', 'imm', 'xf', 'xs', 'lr', 'll', 'mch', 'mst', 'myf', 'nec', 'nei', 'onef', 'ourvs', 'pd', 'percv', 'percvg', 'perh', 'qk', 'rcvg', 'rcv', 'rjc', 'rjcg', 'sd', 'shd', 'sch', 'themvs', 'thyf', 'td', 'tgr', 'tm', 'tn', 'wd', 'yrvs', 'yrf', 'yr'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const strongWordSigns = {
	keys: ['child', 'shall', 'this', 'which', 'out', 'still'],
	replacements: ['*', '%', '?', ':', '\\', '/'],
	regex: standAloneRegEx,
	replacementExpression: standAloneReplacementExpression
};

const initialLetterContractions = {
	keys: ['day', 'ever', 'father', 'here', 'know', 'lord', 'mother', 'name', 'one', 'part', 'question', 'right', 'some', 'time', 'under', 'work', 'young', 'there', 'character', 'through', 'where', 'ought', 'upon', 'word', 'these', 'those', 'whose','cannot', 'had', 'many', 'spirit', 'world', 'their'],
	replacements: ['"d', '"e', '"f', '"h', '"k', '"l', '"m', '"n', '"o', '"p', '"q', '"r', '"s', '"t', '"u', '"w', '"y', '"!', '"*', '"?', '":', '"\\', '^u', '^w', '^!', '^?', '^:','_c', '_h', '_m', '_s', '_w', '_!'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const finalLetterGroupSigns = {
	keys: ['ound', 'ance', 'sion', 'less', 'ount', 'ence', 'ong', 'ful', 'tion', 'ness', 'ment', 'ity'],
	replacements: ['.d', '.e', '.n', '.s', '.t', ';e', ';g', ';l', ';n', ';s', ';t', ';y'],
	regex: (word) => {return new RegExp(`([\\w])${word}`, 'g');},
	replacementExpression: (word) => {return `$1${word}`;}
};

const ing = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('(\\S)ing', 'g');},
	replacementExpression: () => {return '$1+';}
};

const dis = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('([\\s])dis([^h])', 'g');},
	replacementExpression: () => {return '$14$2';}
};

const strongContractions = {
	keys: ['and', 'for', 'of', 'the', 'with'],
	replacements: ['&', '=', '(', '!', ')'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const lowerWordSigns = 	{
	keys: ['be', 'enough', 'were', 'his', 'in', 'was'],
	replacements: ['2', '5', '7', '8', '9', '0'],
	regex: standAloneRegEx,
	replacementExpression: standAloneReplacementExpression

};

const strongGroupSigns = {
	keys: ['ch', 'sh', 'th', 'wh', 'ou', 'st', 'gh', 'ed', 'er', 'ow', 'ar'],
	replacements: ['*', '%', '?', ':', '\\', '/', '<', '$$', ']', '[', '>'],
	regex: partOfWordRegEx,
	replacementExpression: partOfWordReplacement
};

const becon = {
	keys: ['be', 'con'],
	replacements: ['2', '3'],
	regex: (word) => {return new RegExp(`([\\s])${word}([^\\s])`, 'g');},
	replacementExpression: beforeAfterReplacementExpression
};

const eabbccffgg = 	{
	keys: ['ea', 'bb', 'cc', 'ff', 'gg'],
	replacements: ['1', '2', '3', '6', '7'],
	regex: (word) => {return new RegExp(`([\\S])${word}([\\S])`, 'g');},
	replacementExpression: beforeAfterReplacementExpression
};

const enin = {
	keys: ['en', 'in'],
	replacements: ['5', '9'],
	regex: keyWordRegEx,
	replacementExpression: keyWordReplacementExpression
};

const numbers = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('([#.])(\\d+)', 'g');},
	replacementExpression: numberReplacementExpression
};

const decimal = {
	keys: [''],
	replacements: [''],
	regex: () => {return new RegExp('(#\\s*[a-j]+)[.]');},
	replacementExpression: () => {return '$14';}
};

function standAloneRegEx(word){
	return new RegExp(`([\\s!?{}()[\\]"',.-])${word}([\\s!?{}()[\\]"',.-])`, 'g');
}

function standAloneReplacementExpression(replacementValue){
	return `$1${replacementValue}$2`;
}

function keyWordRegEx(word){
	return new RegExp(word, 'g');
}

function keyWordReplacementExpression(replacementValue){
	return replacementValue;
}

function beforeAfterReplacementExpression(replacementValue){
	return `$1${replacementValue}$2`;
}

function partOfWordRegEx(contraction){
	// Don't remember why we needed the not command or semi colon
	// Potentially remove in the future if the reason doesn't surface
	return new RegExp(`([^,;])${contraction}([^,;]|[,;][a-z\\s])`, 'g');
}

function partOfWordReplacement(replacementValue){
	return `$1${replacementValue}$2`;
}


const numberDict = {
	0: 'j',
	1: 'a',
	2: 'b',
	3: 'c',
	4: 'd',
	5: 'e',
	6: 'f',
	7: 'g',
	8: 'h',
	9: 'i'
};

function numberReplacementExpression(){
	return function(match, p1, p2){
		const digit = p2.toString();
		let replacedDigit = p1;
		for(let i=0; i<digit.length;i++){
			replacedDigit += numberDict[digit.charAt(i)];
		}
		return replacedDigit;
	};
}

module.exports = [
	hardCodedReplacements,
	symbols,
	addPound,
	questionMark,
	exclamationPoint,
	period,
	accentLetters,
	standaloneLetters,
	alphabeticWordSigns,
	shortFormWords,
	strongWordSigns,
	initialLetterContractions,
	finalLetterGroupSigns,
	ing,
	dis,
	strongContractions,
	lowerWordSigns,
	strongGroupSigns,
	becon,
	eabbccffgg,
	enin,
	numbers,
	decimal
];
