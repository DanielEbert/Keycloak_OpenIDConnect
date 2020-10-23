import random
import hashlib
import string

class MVPFuzzer:
    def __init__(self):
        self.corpus = ['A']
        self.coverage = set()
        # for now list, later dict
        self.exceptions = []

    def next_test_case(self):
        # simple scheduling (i.e. random)
        inp = random.choice(self.corpus)
        inp = self.mutate(inp)
        return inp

    def mutate(self, inp):
        # super simple mutator
        for _ in range(random.randint(1,10)):
            for _ in range(random.randint(1,10)):
                pos = random.randint(0, len(inp)-1) if len(inp) else 0
                mutation = 0
                # mutation = random.randint(0, 2)
                if mutation == 0:
                    # replace char at pos
                    inp = inp[:pos] + random.choice(string.ascii_letters) + inp[pos+1:]
                elif mutation == 1:
                    # insert char at pos
                    inp = inp[:pos] + random.choice(string.ascii_letters) + inp[pos:]
                else:
                    # remove char at pos
                    inp = inp[:pos] + inp[pos+1:]
        return inp

    def evaluate_coverage(self, inp, cov):
        # cov is list of TODO: see docs
        # TODO: remove jquery cov data? probably bad; e.g. with blacklist of files
        # this currently probably also includes jquery
        cov_to_str = ''
        for entry in cov:
            for code_range in entry['ranges']:
                cov_to_str += f'{code_range["start"]}-{code_range["end"]};'
        cov_hash = hashlib.sha1(cov_to_str.encode()).hexdigest()
        # print(dir(cov))
        if cov_hash not in self.coverage:
            # maybe also check if inp already in corpus
            self.corpus.append(inp)
            self.coverage.add(cov_hash)
            print(f'Added {inp} to corpus')
            print(f'Corpus: {self.corpus}')

    def evaluate_exception(self, exception):
        self.exceptions.append(exception)
