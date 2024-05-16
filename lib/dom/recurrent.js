function assert(condition, message) {
  if (!condition) {
    message = message || 'Assertion failed'
    if (typeof Error !== 'undefined') {
      throw new Error(message)
    }
    throw message // Fallback
  }
}

// Random numbers utils
var return_v = false
var v_val = 0.0
var gaussRandom = function () {
  if (return_v) {
    return_v = false
    return v_val
  }
  var u, v, r, c
  do {
    u = 2 * Math.random() - 1
    v = 2 * Math.random() - 1
    r = u * u + v * v
  } while (r === 0 || r > 1)
  c = Math.sqrt((-2 * Math.log(r)) / r)
  v_val = v * c
  return_v = true
  return u * c
}
var randf = (a, b) => Math.random() * (b - a) + a
var randi = (a, b) => Math.floor(Math.random() * (b - a) + a)
var randn = (mu, std) => mu + gaussRandom() * std

// Helper function to return array of zeros of length n using typed arrays
var zeros = n =>
  typeof n === 'undefined' || isNaN(n) ? [] : new Float64Array(n)

var shuffle = origArray => {
  const N = origArray.length
  const result = origArray.slice()
  for (let i = N - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[randomIndex]
    result[randomIndex] = temp
  }
  return result
}

// Mat holds a matrix
class Mat {
  constructor(n, d) {
    this.n = n
    this.d = d
    this.w = zeros(n * d)
    this.dw = zeros(n * d)
  }

  get(row, col) {
    const ix = this.d * row + col
    assert(ix >= 0 && ix < this.w.length)
    return this.w[ix]
  }

  set(row, col, v) {
    const ix = this.d * row + col
    assert(ix >= 0 && ix < this.w.length)
    this.w[ix] = v
  }

  copy() {
    const result = new Mat(this.n, this.d)
    result.w.set(this.w)
    result.dw.set(this.dw)
    return result
  }

  toString(precision_ = 1e-4) {
    const precision = 1 / precision_
    let result_w = '['
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.d; j++) {
        const ix = i * this.d + j
        assert(ix >= 0 && ix < this.w.length)
        result_w += `${Math.round(precision * this.w[ix]) / precision},\t`
      }
      result_w += '\n'
    }
    result_w += ']'
    return result_w
  }

  print() {
    console.log(this.toString())
  }

  dct2() {
    const n = this.n
    const d = this.d
    const B = new Mat(n, d)
    const sqrt_n_d = Math.sqrt(n * d)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d; j++) {
        let temp = 0
        for (let k = 0; k < n; k++) {
          for (let l = 0; l < d; l++) {
            temp +=
              this.w[k * d + l] *
              Math.cos((i * Math.PI * (2 * k + 1)) / (2 * n)) *
              Math.cos((j * Math.PI * (2 * l + 1)) / (2 * d))
          }
        }
        if (i === 0 && j !== 0) temp *= 1 / Math.SQRT2
        if (j === 0 && i !== 0) temp *= 1 / Math.SQRT2
        if (j === 0 && i === 0) temp *= 0.5
        B.w[i * d + j] = (temp * 2) / sqrt_n_d
      }
    }
    return B
  }

  idct2() {
    const n = this.n
    const d = this.d
    const A = new Mat(n, d)
    const sqrt_n_d = Math.sqrt(n * d)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d; j++) {
        let temp = 0
        for (let k = 0; k < n; k++) {
          for (let l = 0; l < d; l++) {
            let coef = 1
            if (k === 0 && l === 0) coef = 0.5
            else if (k !== 0 && l === 0) coef = 1 / Math.SQRT2
            else if (k === 0 && l !== 0) coef = 1 / Math.SQRT2
            temp +=
              coef *
              this.w[k * d + l] *
              Math.cos(((2 * i + 1) * k * Math.PI) / (2 * n)) *
              Math.cos(((2 * j + 1) * l * Math.PI) / (2 * d))
          }
        }
        A.w[i * d + j] = (temp * 2) / sqrt_n_d
      }
    }
    return A
  }

  toJSON() {
    return { n: this.n, d: this.d, w: Array.from(this.w) }
  }

  fromJSON(json) {
    this.n = json.n
    this.d = json.d
    this.w = new Float64Array(json.w)
    this.dw = zeros(this.n * this.d)
  }
}

var RandMat = function (n, d, mu, std) {
  var m = new Mat(n, d)
  fillRandn(m, mu || 0, std || 0.08)
  return m
}

var fillRandn = function (m, mu, std) {
  for (var i = 0, n = m.w.length; i < n; i++) {
    m.w[i] = randn(mu, std)
  }
}
var fillRand = function (m, lo, hi) {
  for (var i = 0, n = m.w.length; i < n; i++) {
    m.w[i] = randf(lo, hi)
  }
}

class Graph {
  constructor(needs_backprop = true) {
    this.needs_backprop = needs_backprop
    this.backprop = []
  }

  backward() {
    for (var i = this.backprop.length - 1; i >= 0; i--) {
      this.backprop[i]()
    }
  }

  rowPluck(m, ix) {
    assert(ix >= 0 && ix < m.n)
    const out = new Mat(m.d, 1)
    const d = m.d
    for (let i = 0; i < d; i++) {
      out.w[i] = m.w[d * ix + i]
    }

    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < d; i++) {
          m.dw[d * ix + i] += out.dw[i]
        }
      })
    }
    return out
  }

  tanh(m) {
    const out = new Mat(m.n, m.d)
    const n = m.w.length
    for (let i = 0; i < n; i++) {
      out.w[i] = Math.tanh(m.w[i])
    }

    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          const mwi = out.w[i]
          m.dw[i] += (1.0 - mwi * mwi) * out.dw[i]
        }
      })
    }
    return out
  }

  sigmoid(m) {
    const out = new Mat(m.n, m.d)
    const n = m.w.length
    for (let i = 0; i < n; i++) {
      out.w[i] = sig(m.w[i])
    }

    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          const mwi = out.w[i]
          m.dw[i] += mwi * (1.0 - mwi) * out.dw[i]
        }
      })
    }
    return out
  }

  relu(m) {
    const out = new Mat(m.n, m.d)
    const n = m.w.length
    for (let i = 0; i < n; i++) {
      out.w[i] = Math.max(0, m.w[i])
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0.0
        }
      })
    }
    return out
  }

  mul(m1, m2) {
    assert(m1.d === m2.n, 'matmul dimensions misaligned')

    const n = m1.n
    const d = m2.d
    const out = new Mat(n, d)
    const m1d = m1.d
    const m2d = m2.d

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d; j++) {
        let dot = 0.0
        for (let k = 0; k < m1d; k++) {
          dot += m1.w[m1d * i + k] * m2.w[m2d * k + j]
        }
        out.w[d * i + j] = dot
      }
    }

    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < d; j++) {
            const b = out.dw[d * i + j]
            for (let k = 0; k < m1d; k++) {
              m1.dw[m1d * i + k] += m2.w[m2d * k + j] * b
              m2.dw[m2d * k + j] += m1.w[m1d * i + k] * b
            }
          }
        }
      })
    }
    return out
  }

  add(m1, m2) {
    assert(m1.w.length === m2.w.length)

    const out = new Mat(m1.n, m1.d)
    for (let i = 0, n = m1.w.length; i < n; i++) {
      out.w[i] = m1.w[i] + m2.w[i]
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0, n = m1.w.length; i < n; i++) {
          m1.dw[i] += out.dw[i]
          m2.dw[i] += out.dw[i]
        }
      })
    }
    return out
  }

  eltmul(m1, m2) {
    assert(m1.w.length === m2.w.length)

    const out = new Mat(m1.n, m1.d)
    for (let i = 0, n = m1.w.length; i < n; i++) {
      out.w[i] = m1.w[i] * m2.w[i]
    }
    if (this.needs_backprop) {
      this.backprop.push(() => {
        for (let i = 0, n = m1.w.length; i < n; i++) {
          m1.dw[i] += m2.w[i] * out.dw[i]
          m2.dw[i] += m1.w[i] * out.dw[i]
        }
      })
    }
    return out
  }
}

var softmax = m => {
  const out = new Mat(m.n, m.d)
  let maxval = -Infinity
  for (let i = 0, n = m.w.length; i < n; i++) {
    if (m.w[i] > maxval) maxval = m.w[i]
  }

  let s = 0.0
  for (let i = 0, n = m.w.length; i < n; i++) {
    out.w[i] = Math.exp(m.w[i] - maxval)
    s += out.w[i]
  }
  for (let i = 0, n = m.w.length; i < n; i++) {
    out.w[i] /= s
  }

  return out
}

class Solver {
  constructor() {
    this.decay_rate = 0.999
    this.smooth_eps = 1e-8
    this.step_cache = {}
  }

  step(model, step_size, regc, clipval) {
    const solver_stats = {}
    let num_clipped = 0
    let num_tot = 0
    for (const k in model) {
      if (model.hasOwnProperty(k)) {
        const m = model[k]
        if (!(k in this.step_cache)) {
          this.step_cache[k] = new Mat(m.n, m.d)
        }
        const s = this.step_cache[k]
        for (let i = 0, n = m.w.length; i < n; i++) {
          const mdwi = m.dw[i]
          s.w[i] =
            s.w[i] * this.decay_rate + (1.0 - this.decay_rate) * mdwi * mdwi

          let gradient = mdwi
          if (gradient > clipval) {
            gradient = clipval
            num_clipped++
          }
          if (gradient < -clipval) {
            gradient = -clipval
            num_clipped++
          }
          num_tot++

          m.w[i] +=
            (-step_size * gradient) / Math.sqrt(s.w[i] + this.smooth_eps) -
            regc * m.w[i]
          m.dw[i] = 0
        }
      }
    }
    solver_stats.ratio_clipped = num_clipped / num_tot
    return solver_stats
  }
}

var initLSTM = function (input_size, hidden_sizes, output_size) {
  const model = {}
  let prev_size = input_size
  for (let d = 0; d < hidden_sizes.length; d++) {
    const hidden_size = hidden_sizes[d]
    model[`Wix${d}`] = new RandMat(hidden_size, prev_size, 0, 0.08)
    model[`Wih${d}`] = new RandMat(hidden_size, hidden_size, 0, 0.08)
    model[`bi${d}`] = new Mat(hidden_size, 1)
    model[`Wfx${d}`] = new RandMat(hidden_size, prev_size, 0, 0.08)
    model[`Wfh${d}`] = new RandMat(hidden_size, hidden_size, 0, 0.08)
    model[`bf${d}`] = new Mat(hidden_size, 1)
    model[`Wox${d}`] = new RandMat(hidden_size, prev_size, 0, 0.08)
    model[`Woh${d}`] = new RandMat(hidden_size, hidden_size, 0, 0.08)
    model[`bo${d}`] = new Mat(hidden_size, 1)
    model[`Wcx${d}`] = new RandMat(hidden_size, prev_size, 0, 0.08)
    model[`Wch${d}`] = new RandMat(hidden_size, hidden_size, 0, 0.08)
    model[`bc${d}`] = new Mat(hidden_size, 1)
    prev_size = hidden_size
  }
  model.Whd = new RandMat(output_size, prev_size, 0, 0.08)
  model.bd = new Mat(output_size, 1)
  return model
}

var forwardLSTM = function (G, model, hidden_sizes, x, prev) {
  let hidden_prevs = []
  let cell_prevs = []
  if (typeof prev.h === 'undefined') {
    for (let d = 0; d < hidden_sizes.length; d++) {
      hidden_prevs.push(new Mat(hidden_sizes[d], 1))
      cell_prevs.push(new Mat(hidden_sizes[d], 1))
    }
  } else {
    hidden_prevs = prev.h
    cell_prevs = prev.c
  }

  const hidden = []
  const cell = []
  for (let d = 0; d < hidden_sizes.length; d++) {
    const input_vector = d === 0 ? x : hidden[d - 1]
    const hidden_prev = hidden_prevs[d]
    const cell_prev = cell_prevs[d]

    const h0 = G.mul(model[`Wix${d}`], input_vector)
    const h1 = G.mul(model[`Wih${d}`], hidden_prev)
    const input_gate = G.sigmoid(G.add(G.add(h0, h1), model[`bi${d}`]))

    const h2 = G.mul(model[`Wfx${d}`], input_vector)
    const h3 = G.mul(model[`Wfh${d}`], hidden_prev)
    const forget_gate = G.sigmoid(G.add(G.add(h2, h3), model[`bf${d}`]))

    const h4 = G.mul(model[`Wox${d}`], input_vector)
    const h5 = G.mul(model[`Woh${d}`], hidden_prev)
    const output_gate = G.sigmoid(G.add(G.add(h4, h5), model[`bo${d}`]))

    const h6 = G.mul(model[`Wcx${d}`], input_vector)
    const h7 = G.mul(model[`Wch${d}`], hidden_prev)
    const cell_write = G.tanh(G.add(G.add(h6, h7), model[`bc${d}`]))

    const retain_cell = G.eltmul(forget_gate, cell_prev)
    const write_cell = G.eltmul(input_gate, cell_write)
    const cell_d = G.add(retain_cell, write_cell)

    const hidden_d = G.eltmul(output_gate, G.tanh(cell_d))

    hidden.push(hidden_d)
    cell.push(cell_d)
  }

  const output = G.add(G.mul(model.Whd, hidden[hidden.length - 1]), model.bd)

  return { h: hidden, c: cell, o: output }
}

var initRNN = function (input_size, hidden_sizes, output_size) {
  const model = {}
  let prev_size = input_size
  for (let d = 0; d < hidden_sizes.length; d++) {
    const hidden_size = hidden_sizes[d]
    model[`Wxh${d}`] = new RandMat(hidden_size, prev_size, 0, 0.08)
    model[`Whh${d}`] = new RandMat(hidden_size, hidden_size, 0, 0.08)
    model[`bhh${d}`] = new Mat(hidden_size, 1)
    prev_size = hidden_size
  }
  model.Whd = new RandMat(
    output_size,
    hidden_sizes[hidden_sizes.length - 1],
    0,
    0.08
  )
  model.bd = new Mat(output_size, 1)
  return model
}

var forwardRNN = function (G, model, hidden_sizes, x, prev) {
  let hidden_prevs = []
  if (typeof prev.h === 'undefined') {
    for (let d = 0; d < hidden_sizes.length; d++) {
      hidden_prevs.push(new Mat(hidden_sizes[d], 1))
    }
  } else {
    hidden_prevs = prev.h
  }

  const hidden = []
  for (let d = 0; d < hidden_sizes.length; d++) {
    const input_vector = d === 0 ? x : hidden[d - 1]
    const hidden_prev = hidden_prevs[d]

    const h0 = G.mul(model[`Wxh${d}`], input_vector)
    const h1 = G.mul(model[`Whh${d}`], hidden_prev)
    const hidden_d = G.relu(G.add(G.add(h0, h1), model[`bhh${d}`]))

    hidden.push(hidden_d)
  }

  const output = G.add(G.mul(model.Whd, hidden[hidden.length - 1]), model.bd)

  return { h: hidden, o: output }
}

var sig = x => 1.0 / (1 + Math.exp(-x))

var maxi = w => {
  let maxv = w[0]
  let maxix = 0
  for (let i = 1, n = w.length; i < n; i++) {
    if (w[i] > maxv) {
      maxix = i
      maxv = w[i]
    }
  }
  return maxix
}

var samplei = w => {
  const r = Math.random()
  let x = 0.0
  let i = 0
  while (true) {
    x += w[i]
    if (x > r) {
      return i
    }
    i++
  }
}

var getModelSize = model => {
  let len = 0
  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      len += model[k].w.length
    }
  }
  return len
}

var flattenModel = (model, gradient_ = false) => {
  const len = getModelSize(model)
  const result = zeros(len)
  let i = 0
  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      const m = model[k]
      for (let j = 0; j < m.w.length; j++) {
        result[i++] = gradient_ ? m.dw[j] : m.w[j]
      }
    }
  }
  return result
}

var pushToModel = (model, dump, gradient_ = false) => {
  let i = 0
  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      const m = model[k]
      for (let j = 0; j < m.w.length; j++) {
        if (gradient_) {
          m.dw[j] = dump[i]
        } else {
          m.w[j] = dump[i]
        }
        i++
      }
    }
  }
}

var copyModel = model => {
  const result = {}
  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      result[k] = model[k].copy()
    }
  }
  return result
}

var compressModel = (model, nCoef) => {
  const result = {}
  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      const m = model[k].dct2()
      const nRow = Math.min(m.n, nCoef)
      const nCol = Math.min(m.d, nCoef)
      result[k] = new Mat(nRow, nCol)
      for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
          result[k].set(i, j, m.get(i, j))
        }
      }
    }
  }
  return result
}

var decompressModel = (small, model) => {
  for (const k in small) {
    if (small.hasOwnProperty(k)) {
      const s = small[k]
      const m = model[k]
      const z = new Mat(m.n, m.d)
      for (let i = 0; i < s.n; i++) {
        for (let j = 0; j < s.d; j++) {
          z.set(i, j, s.get(i, j))
        }
      }
      model[k] = z.idct2()
    }
  }
}

var numGradient = (f, model, avgDiff_ = false, epsilon_ = 1e-10) => {
  const epsilon = epsilon_
  const avgDiff = avgDiff_
  const base = f(model)
  const uptick = copyModel(model)
  const downtick = copyModel(model)
  const numGrad = copyModel(model)

  let avgPercentDiff = 0.0
  let avgPercentDiffCounter = 0

  for (const k in model) {
    if (model.hasOwnProperty(k)) {
      const m = model[k]
      for (let i = 0; i < m.w.length; i++) {
        uptick[k].w[i] += epsilon
        downtick[k].w[i] -= epsilon
        const upBase = f(uptick)
        const downBase = f(downtick)
        numGrad[k].dw[i] = (upBase - downBase) / (2 * epsilon)
        numGrad[k].w[i] =
          (numGrad[k].dw[i] + epsilon) / (model[k].dw[i] + epsilon) - 1
        avgPercentDiff += numGrad[k].w[i] * numGrad[k].w[i]
        avgPercentDiffCounter++
        uptick[k].w[i] -= epsilon
        downtick[k].w[i] += epsilon
      }
    }
  }

  return avgDiff ? Math.sqrt(avgPercentDiff / avgPercentDiffCounter) : numGrad
}

class Gene {
  constructor(initFloatArray) {
    this.fitness = -1e20
    this.nTrial = 0
    this.gene = Float64Array.from(initFloatArray)
  }

  burstMutate(burst_magnitude = 0.1) {
    for (let i = 0; i < this.gene.length; i++) {
      this.gene[i] += randn(0.0, burst_magnitude)
    }
  }

  randomize(burst_magnitude = 0.1) {
    for (let i = 0; i < this.gene.length; i++) {
      this.gene[i] = randn(0.0, burst_magnitude)
    }
  }

  mutate(mutation_rate = 0.1, burst_magnitude = 0.1) {
    for (let i = 0; i < this.gene.length; i++) {
      if (Math.random() < mutation_rate) {
        this.gene[i] += randn(0.0, burst_magnitude)
      }
    }
  }

  crossover(partner, kid1, kid2) {
    assert(this.gene.length === partner.gene.length)
    assert(partner.gene.length === kid1.gene.length)
    assert(kid1.gene.length === kid2.gene.length)
    const N = this.gene.length
    const l = randi(0, N)
    for (let i = 0; i < N; i++) {
      if (i < l) {
        kid1.gene[i] = this.gene[i]
        kid2.gene[i] = partner.gene[i]
      } else {
        kid1.gene[i] = partner.gene[i]
        kid2.gene[i] = this.gene[i]
      }
    }
  }

  copyFrom(g) {
    this.gene.set(g.gene)
  }

  copyFromArray(sourceFloatArray) {
    assert(this.gene.length === sourceFloatArray.length)
    this.gene.set(sourceFloatArray)
  }

  copy(precision_ = 1e-4) {
    const precision = 1 / precision_
    const newFloatArray = this.gene.map(
      val => Math.round(precision * val) / precision
    )
    const g = new Gene(newFloatArray)
    g.fitness = this.fitness
    g.nTrial = this.nTrial
    return g
  }

  pushToModel(model) {
    pushToModel(model, this.gene)
  }
}

var randomizeModel = (model, magnitude_ = 1.0) => {
  const modelSize = getModelSize(model)
  const r = new RandMat(1, modelSize, 0, magnitude_)
  const g = new Gene(r.w)
  g.pushToModel(model)
}

class GATrainer {
  constructor(model, options_ = {}, init_gene_array) {
    this.model = copyModel(model)
    const options = options_
    this.hall_of_fame_size = options.hall_of_fame_size || 5
    this.population_size = options.population_size || 30
    this.population_size += this.hall_of_fame_size
    this.population_size = Math.floor(this.population_size / 2) * 2
    this.length = this.population_size
    this.mutation_rate = options.mutation_rate || 0.01
    this.init_weight_magnitude = options.init_weight_magnitude || 1.0
    this.elite_percentage = options.elite_percentage || 0.2
    this.mutation_size = options.mutation_size || 0.5
    this.debug_mode = options.debug_mode || false
    this.gene_size = getModelSize(this.model)

    let initGene
    if (init_gene_array) {
      initGene = new Gene(init_gene_array)
    }

    this.genes = []
    this.hallOfFame = []
    for (let i = 0; i < this.population_size; i++) {
      const gene = new Gene(zeros(this.gene_size))
      if (initGene) {
        gene.copyFrom(initGene)
        if (i > 0) {
          gene.burstMutate(this.mutation_size)
        }
      } else {
        gene.randomize(this.init_weight_magnitude)
      }
      this.genes.push(gene)
    }

    for (let i = 0; i < this.hall_of_fame_size; i++) {
      const gene = new Gene(zeros(this.gene_size))
      if (init_gene_array) {
        gene.copyFrom(initGene)
      } else {
        gene.randomize(this.init_weight_magnitude)
        if (i > 0) {
          gene.burstMutate(this.mutation_size)
        }
      }
      this.hallOfFame.push(gene)
    }

    pushToModel(this.model, this.genes[0].gene)
  }

  sortByFitness(c) {
    return c.sort((a, b) => b.fitness - a.fitness)
  }

  pushGeneToModel(model, i) {
    this.genes[i].pushToModel(model)
  }

  pushBestGeneToModel(model) {
    this.pushGeneToModel(model, 0)
  }

  pushHistToModel(model, i) {
    const g = this.hallOfFame[i]
    g.pushToModel(model)
  }

  pushBestHistToModel(model) {
    this.pushHistToModel(model, 0)
  }

  flushFitness() {
    for (let i = 0; i < this.population_size; i++) {
      this.genes[i].fitness = -1e20
    }
    for (let i = 0; i < this.hall_of_fame_size; i++) {
      this.hallOfFame[i].fitness = -1e20
    }
  }

  evolve() {
    this.genes = this.sortByFitness(this.genes)

    if (this.debug_mode) {
      console.log(`0: ${Math.round(this.genes[0].fitness * 100) / 100}`)
      console.log(
        `${this.population_size - 1}: ${
          Math.round(this.genes[this.population_size - 1].fitness * 100) / 100
        }`
      )
    }

    for (let i = 0; i < this.hall_of_fame_size; i++) {
      this.hallOfFame.push(this.genes[i].copy())
    }

    this.hallOfFame = this.sortByFitness(this.hallOfFame).slice(
      0,
      this.hall_of_fame_size
    )

    if (this.debug_mode) {
      console.log('hall of fame:')
      for (let i = 0; i < Math.min(this.hall_of_fame_size, 3); i++) {
        console.log(
          `${i}: ${Math.round(this.hallOfFame[i].fitness * 100) / 100}`
        )
      }
    }

    const Nelite =
      Math.floor((this.elite_percentage * this.population_size) / 2) * 2
    for (let i = Nelite; i < this.population_size; i += 2) {
      const p1 = randi(0, Nelite)
      const p2 = randi(0, Nelite)
      this.genes[p1].crossover(this.genes[p2], this.genes[i], this.genes[i + 1])
    }

    for (let i = 0; i < this.population_size - this.hall_of_fame_size; i++) {
      this.genes[i].mutate(this.mutation_rate, this.mutation_size)
    }

    for (let i = 0; i < this.hall_of_fame_size; i++) {
      this.genes[this.population_size - this.hall_of_fame_size + i] =
        this.hallOfFame[i].copy()
    }

    const Nperm = Nelite
    const permData = zeros(Nperm)
    const len = this.genes[0].gene.length
    for (let j = 0; j < len; j++) {
      for (let i = 0; i < Nperm; i++) {
        permData[i] = this.genes[i].gene[j]
      }
      const shuffled = shuffle(permData)
      for (let i = 0; i < Nperm; i++) {
        this.genes[i].gene[j] = shuffled[i]
      }
    }
  }
}

export default {
  maxi,
  samplei,
  randi,
  randf,
  randn,
  zeros,
  shuffle,
  softmax,
  assert,
  Mat,
  RandMat,
  forwardLSTM,
  initLSTM,
  forwardRNN,
  initRNN,
  Solver,
  Graph,
  flattenModel,
  getModelSize,
  copyModel,
  numGradient,
  pushToModel,
  randomizeModel,
  compressModel,
  decompressModel,
  GATrainer,
  Gene
}
