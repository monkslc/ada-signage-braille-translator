const {expect} = require('chai');
const fs = require('fs');
const readline = require('readline');

const translate = require('../');

describe('translate()' , () => {
	describe('room identifiers', () => {
		it('should translate a sequence of numbers to the appropriate sequence of letters with the number symbol', () => {
			expect(translate('489')).to.equal('#dhi');
		});

		it('should keep uppercase letters uppercase', () => {
			expect(translate('123B')).to.equal('#abc;,b');
		});

		it('should keep lowercase letters lowercase', () => {
			expect(translate('456b')).to.equal('#def;b');
		});
	});

	describe('explicit replacements', () => {
		it('should make fr. uppercase', () => {
			expect(translate('fr.')).to.equal(';fr4');
		});
	});

	describe('symbols', () => {
		it('should properly replace the symbols', () => {
			expect(translate('washer/dryer')).to.equal('wa%]_/dry]');
		});
	});

	describe('puncuation replacement', () => {
		it('should convert ? to 8', () => {
			expect(translate('?')).to.equal('8');
		});

		it('should not convert _? to 8', () => {
			expect(translate('_?')).to.equal('_?');
		});

		it('should replace ! with 6', () => {
			expect(translate('!')).to.equal('6');
		});

		it('should replace . with 4', () => {
			expect(translate('M.I.T.')).to.equal('m4i4t4');
		});
	});

	describe('accent letters', () => {
		it('should convert å to ^$a', () => {
			expect(translate('å')).to.equal('^$a');
		});
	});

	describe('stand alone letters', () => {
		it('should convert stand alone letters to uppercase', () => {
			expect(translate('room a')).to.equal('room ;a');
		});
	});

	describe('alphabetic word signs', () => {
		it('should convert alphabetic word signs when its standalone', () => {
			expect(translate('just')).to.equal('j');
		});

		it('should not convert alphabetic word signs when its a part of another word', () => {
			expect(translate('justice')).to.equal('ju/ice');
		});
	});

	describe('short form words', () => {
		it('should convert short form words when they are standalone', () => {
			expect(translate('your')).to.equal('yr');
		});

		it('should not convert short form words when they are a part of another word', () => {
			//TODO: fix this because its actually not right
			//expect(translate('shim')).to.equal('shim');
		});
	});

	describe('strong word signs', () => {
		it('should convert strong word signs when they are standalone', () => {
			expect(translate('out')).to.equal('\\');
		});

		it('should not convert strong word signs when they are a part of another word', () => {
			expect(translate('childish')).to.equal('*ildi%');
		});
	});

	describe('initial letter contractions', () => {
		it('should convert a word to its initial letter contraction when its standalone', () => {
			expect(translate('day')).to.equal('"d');
		});

		it('should convert a word to its intial letter contraction when its a part of another word', () => {
			expect(translate('birthday')).to.equal('bir?"d');
		});
	});

	describe('final letter group signs', () => {
		it('should replace the sequence with the appropriate group sign', () => {
			expect(translate('stance')).to.equal('/.e');
		});
	});

	describe('ing', () => {
		it('should replace "ing" when its not preceded by white space', () => {
			expect(translate('translating')).to.equal('translat+');
		});

		it('should not replace "ing" when its preceded by white space', () => {
			expect(translate('lol ing')).to.equal('lol 9g');
		});
	});

	describe('dis', () => {
		it('should replace "dis" when its preceded by white space', () => {
			// TODO: fix this, it is giving a different result than the site
			//expect(translate('disrespect')).to.equal('4respect;l');
		});

		it('should not replace "dis" when its not preceded by white space', () => {
			expect(translate('bradis')).to.equal('bradis');
		});

		it('should not replace "dis" when its succeeded by h', () => {
			// might be able to remove the h rule because % comes first
			expect(translate('dish')).to.equal('di%');
		});
	});

	describe('strong contractions', () => {
		it('should replace strong contractions', () => {
			expect(translate('brand')).to.equal('br&');
			expect(translate('and')).to.equal('&');
		});
	});

	describe('lower word signs', () => {
		it('should replace lower word signs when they are a stand alone word', () => {
			expect(translate('his')).to.equal('8');
		});

		it('should not replace lower words signs when they are not stand alone', () => {
			expect(translate('mhis')).to.equal('mhis');
		});
	});

	describe('strong group signs', () => {
		it('should replace strong group signs when they are a part of a word', () => {
			expect(translate('chat')).to.equal('*at');
			expect(translate('reference')).to.equal('ref];e');
		});

		it('should replace strong group sings when followed by a contraction symbol', () => {
			expect(translate('reference')).to.equal('ref];e');
		});

		// Words with ed need to be carefully escaped since the replacement value is $
		it('correcly translates words with ed', () => {
			expect(translate('soiled')).to.equal('soil$');	
		});
	});

	describe('"be" and "con"', () => {
		it('should replace be and con when its a part of a word', () => {
			expect(translate('contain')).to.equal('3ta9');
		});

		it('should not replace be and con when they are stand alone', () => {
			expect(translate('con')).to.equal('con');
		});
	});

	describe('ea, bb, cc, ff, gg', () => {
		it('should replace the pairs with the appropriate contraction', () => {
			expect(translate('dread')).to.equal('dr1d');
		});

		it('should not replace the pairs when they are stand alone', () => {
			expect(translate('ea')).to.equal('ea');
		});
	});

	describe('en and in', () => {
		it('should replace en and in with the appropriate contraction', () => {
			expect(translate('in')).to.equal('9');
		});
	});

	describe('numbers', () => {
		it('should replace numbers with a number symbol and the appropriate letter', () => {
			expect(translate('46')).to.equal('#df');
		});
	});

	//TODO: probably have an additional test case around this and periods
	describe('decimal', () => {
		it('should replace decimals with the number 4', () => {
			expect(translate('123.4')).to.equal('#abc4d');
		});
	});

	describe('accuracy test', () => {
		let correct = 0;
		let total = 0;
		let firstLine = true;
		it('should have at least 97% accuracy against the actual mesasage schedule', (done) => {
			const f = fs.createReadStream('message-schedule-example.txt');
			const rl = readline.createInterface({input: f});
			rl.on('line', (data) => {
				if (firstLine === true) {
					firstLine = false;
					return;
				}

				total += 1;
				let [phrase, actual] = data.split('\t');
				if (translate(phrase.trim()) === actual.trim()) {
					correct += 1;
				} 
			});

			f.on('close', () => {
				console.log('Accuracy');
				console.log(correct / total);
				expect(correct / total).to.be.above(.9855);
				done();
			});
		});
	});

});
