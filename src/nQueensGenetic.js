class nQueens {
  constructor(n, pop, genMax, pn = 0.5, pm = 0.5) {
    this.n = n;
    this.Pop = pop;
    this.genMax = genMax;
    this.pn = pn;
    this.pm = pm;
  }

  evo = () => {
    let P = this.generatePopulation(this.n, this.Pop);
    const attacks = [];
    const errors = [];
    let gen = 0;
    P.forEach((individual) => attacks.push(this.evaluate(individual)));

    let best = attacks.indexOf(Math.min(...attacks));
    errors.push(this.evaluate(P[best]));

    while (gen < this.genMax && this.evaluate(P[best]) > 0) {
      const Pn = this.selection(P);
      this.crossover(Pn);
      this.mutation(Pn);
      const attacks = [];
      Pn.forEach((individual) => attacks.push(this.evaluate(individual)));
      best = attacks.indexOf(Math.min(...attacks));
      errors.push(this.evaluate(P[best]));
      P = Pn;
      gen++;
    }

    return {
      board: P[best],
      errors: this.evaluate(P[best]),
      generation: gen,
      errorsThroughGenerations: errors,
    };
  };

  generatePopulation = (n, pop) => {
    const P = [];
    for (let i = 0; i < pop; i++) {
      P.push([]);
      for (let j = 0; j < n; j++) {
        let rand = Math.floor(Math.random() * n);
        while (P[i].includes(rand)) {
          rand = Math.floor(Math.random() * n);
        }
        P[i].push(rand);
      }
    }
    return P;
  };

  /**
   * @param {[]} individual
   */

  evaluate = (individual) => {
    let attackCounter = 0;

    for (let i = 0; i < this.n; i++) {
      for (let j = i + 1; j < this.n; j++) {
        const firstQueen = [i + 1, individual[i]];
        const secondQueen = [j + 1, individual[j]];
        if (
          Math.abs(firstQueen[0] - secondQueen[0]) ===
          Math.abs(firstQueen[1] - secondQueen[1])
        ) {
          attackCounter += 1;
        }
      }
    }

    return attackCounter;
  };

  /**
   * @param {[]} P
   */

  selection = (P) => {
    const Pn = [];
    let i = 0;
    while (i < this.Pop) {
      let i1 = Math.floor(Math.random() * this.Pop);
      let i2 = Math.floor(Math.random() * this.Pop);

      if (i1 !== i2) {
        if (this.evaluate(P[i1] <= this.evaluate(P[i2]))) {
          Pn[i] = P[i1];
        } else {
          Pn[i] = P[i2];
        }
        i++;
      }
    }
    return Pn;
  };

  /**
   * @param {[]} P
   */

  crossover = (P) => {
    let i = 0;
    const pc = 0.7;
    while (i < this.Pop - 2) {
      if (Math.random() <= pc) {
        this.cross(P[i], P[i + 1]);
      }
      i += 2;
    }
  };

  /**
   * @param {[]} P1
   * @param {[]} P2
   */

  cross = (P1, P2) => {
    const start = Math.floor(Math.random() * (this.Pop - 1));
    const end = start + Math.floor(Math.random() * (this.Pop - start));

    let _map1 = {};
    let _map2 = {};

    let offspring = [Array.from(P1), Array.from(P2)];

    for (let i = start; i <= end; i++) {
      offspring[0][i] = P2[i];
      _map1[P2[i]] = P1[i];

      offspring[1][i] = P1[i];
      _map2[P1[i]] = P2[i];
    }

    for (let i = 0; i < start; i++) {
      while (offspring[0][i] in _map1) {
        offspring[0][i] = _map1[offspring[0][i]];
      }
      while (offspring[1][i] in _map2) {
        offspring[1][i] = _map2[offspring[1][i]];
      }
    }

    for (let i = end + 1; i < P1.length; i++) {
      while (offspring[0][i] in _map1) {
        offspring[0][i] = _map1[offspring[0][i]];
      }
      while (offspring[1][i] in _map2) {
        offspring[1][i] = _map2[offspring[1][i]];
      }
    }

    return offspring;
  };

  mutation = (P) => {
    const Pm = 0.5;
    let i = 0;
    while (i < this.Pop) {
      if (Math.random() <= Pm) {
        this.mutate(P[i]);
      }
      i++;
    }
  };

  mutate = (individual) => {
    const queen1 = Math.floor(Math.random() * this.n);
    let queen2 = Math.floor(Math.random() * this.n);
    while (queen1 === queen2) {
      queen2 = Math.floor(Math.random() * this.n);
    }

    const queen1Val = individual[queen1];
    const queen2Val = individual[queen2];

    individual[queen1] = queen2Val;
    individual[queen2] = queen1Val;

    return individual;
  };
}

export { nQueens };
