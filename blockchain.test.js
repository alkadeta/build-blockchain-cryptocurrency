const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    })

    it('constain a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('add a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({data : newData})
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData)
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('return false', () => {
                blockchain.chain[0] = { data  : 'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({data : 'Bears'});
                blockchain.addBlock({data : 'Beets'});
                blockchain.addBlock({data : 'Battlestar Galactica'});
            })
            describe('and the chain contains the block with an invalid field', () => {
                it('return false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        });

        describe('and the chain constains a block with an invalid field', () => {
            it('return false', () => {
                blockchain.chain[2].data = 'some-bad-and-evil-data';
                
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('and the chain does not contain any invalid blocks', () => {
            it('return true', () => {                
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
            });
        });
    })
})