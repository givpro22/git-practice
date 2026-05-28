// Dynamic space sound synthesis engine using Web Audio API

class SpaceSynthManager {
  constructor() {
    this.ctx = null;
    this.masterVolume = null;
    this.delayNode = null;
    this.delayFeedback = null;
    this.isEnabled = false;
  }

  init() {
    if (this.ctx) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Master volume node
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(0.15, this.ctx.currentTime); // Limit max volume to avoid clipping

      // Ambient Space Delay / Reverb effect
      this.delayNode = this.ctx.createDelay(2.0);
      this.delayFeedback = this.ctx.createGain();
      
      this.delayNode.delayTime.setValueAtTime(0.4, this.ctx.currentTime); // 400ms delay
      this.delayFeedback.gain.setValueAtTime(0.5, this.ctx.currentTime); // Nice feedback loop

      // Connect delay loop
      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);

      // Connect standard path: Synth -> Master -> Output
      // Also connect: Synth -> Delay -> Master -> Output
      this.masterVolume.connect(this.ctx.destination);
      this.delayNode.connect(this.masterVolume);
      
      this.isEnabled = true;
    } catch (e) {
      console.error("Failed to initialize Web Audio API:", e);
    }
  }

  enable() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = true;
  }

  disable() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
    this.isEnabled = false;
  }

  /**
   * Synthesize a gorgeous spatial chime sound for star/planet collisions
   * @param {number} intensity - Visual intensity of the collision (mass-based)
   */
  playCollisionSound(intensity = 1.0) {
    if (!this.isEnabled || !this.ctx) return;
    
    const now = this.ctx.currentTime;
    const sizeFactor = Math.min(1.5, Math.max(0.5, intensity));

    // Base pitch scales inversely with mass/intensity
    // Light bodies make high-pitched chimes, massive ones make deeper bells
    const baseFreq = 440 / sizeFactor;

    // Harmonizer frequencies for FM/additive synthesis
    const harmonics = [1.0, 1.5, 2.0, 2.61, 3.14, 4.0];
    
    harmonics.forEach((h, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Beautiful space-like waveforms: smooth triangles & warm sines
      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * h, now);
      
      // Add slight pitch vibrato for standard spatial shimmering
      osc.frequency.setValueAtTime(baseFreq * h, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * h * 0.99, now + 0.5);

      // Amplitude Envelope (Short attack, exponential release)
      const attack = 0.01;
      const decay = 0.8 * sizeFactor * (1 / h); // higher harmonics decay faster
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08 * (1 / (index + 1)), now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

      osc.connect(gain);
      gain.connect(this.masterVolume);
      gain.connect(this.delayNode); // Send to delay feedback loop for celestial spaciousness

      osc.start(now);
      osc.stop(now + attack + decay + 0.1);
    });
  }

  /**
   * Synthesize a massive sub-bass gravity sweep when a body is absorbed by a black hole
   * @param {number} mass - Mass of the devoured object
   */
  playAbsorptionSound(mass = 100) {
    if (!this.isEnabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 1.8;

    // Sub-bass Oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + duration);

    // Dynamic low-pass resonant filter sweep (feels like swallowing space)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(12, now);
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(45, now + duration * 0.8);

    // Gain Envelope
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + duration + 0.1);

    // Add a high-pitch resonance bubble pop (visual sound of particle compression)
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(800, now);
    popOsc.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    popGain.gain.setValueAtTime(0, now);
    popGain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    popOsc.connect(popGain);
    popGain.connect(this.masterVolume);
    popGain.connect(this.delayNode);

    popOsc.start(now);
    popOsc.stop(now + 0.4);
  }

  /**
   * Plays a gentle synthesizer beep when spawning a planet manually
   */
  playSpawnSound(type = 'planet') {
    if (!this.isEnabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    let pitch = 300;
    let length = 0.15;
    if (type === 'star') pitch = 220;
    if (type === 'asteroid') pitch = 600;
    if (type === 'blackhole') {
      pitch = 80;
      length = 0.5;
    }

    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + length);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + length);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + length + 0.05);
  }
}

export const spaceSynth = new SpaceSynthManager();
export default spaceSynth;
