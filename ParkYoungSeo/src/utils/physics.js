// Physics calculation utility for CosmOS
export const GRAVITY_DEFAULT = 0.5;

// Softening parameter to prevent extreme force calculations at very close distances
const SOFTENING = 15;

/**
 * Calculate the next physics step for all celestial bodies
 * @param {Array} bodies - Array of celestial bodies
 * @param {number} G - Gravitational constant
 * @param {number} dt - Time step factor (speed of simulation)
 * @param {string} collisionMode - 'merge' | 'bounce'
 * @param {Function} onEvent - Event listener for sounds (e.g. { type: 'collision' | 'absorption', massRatio })
 * @returns {Array} - The updated list of celestial bodies
 */
export function updatePhysics(bodies, G, dt, collisionMode, onEvent) {
  if (bodies.length === 0) return [];

  // Deep clone to keep updates pure, but preserve trails efficiently
  let nextBodies = bodies.map(b => ({
    ...b,
    ax: 0,
    ay: 0,
    trail: [...b.trail]
  }));

  // 1. Calculate Gravitational Forces (Accelerations)
  for (let i = 0; i < nextBodies.length; i++) {
    const b1 = nextBodies[i];
    if (b1.isStatic) continue;

    for (let j = 0; j < nextBodies.length; j++) {
      if (i === j) continue;
      const b2 = nextBodies[j];

      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      if (dist === 0) continue;

      // Newtonian gravity: a = G * m2 * r_vec / (r^2 + softening^2)^(1.5)
      const softenedDistSq = distSq + SOFTENING * SOFTENING;
      const softenedDistCubed = Math.pow(softenedDistSq, 1.5);
      
      const forceMag = (G * b2.mass) / softenedDistCubed;
      
      b1.ax += forceMag * dx;
      b1.ay += forceMag * dy;
    }
  }

  // 2. Update Velocities and Positions
  for (let i = 0; i < nextBodies.length; i++) {
    const b = nextBodies[i];
    if (!b.isStatic) {
      b.vx += b.ax * dt;
      b.vy += b.ay * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }

    // 3. Manage Trails (Store history of positions)
    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > b.maxTrailLength) {
      b.trail.shift();
    }
  }

  // 4. Handle Collisions and Mergers
  let destroyedIds = new Set();
  
  for (let i = 0; i < nextBodies.length; i++) {
    if (destroyedIds.has(nextBodies[i].id)) continue;
    
    for (let j = i + 1; j < nextBodies.length; j++) {
      if (destroyedIds.has(nextBodies[j].id)) continue;

      const b1 = nextBodies[i];
      const b2 = nextBodies[j];

      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = b1.radius + b2.radius;

      if (dist < minDist) {
        // Collision detected!
        
        // Scenario A: One is a Black Hole - ALWAYS absorb!
        if (b1.type === 'blackhole' || b2.type === 'blackhole') {
          const bh = b1.type === 'blackhole' ? b1 : b2;
          const prey = b1.type === 'blackhole' ? b2 : b1;

          // Mass absorption (adds some portion of prey mass)
          bh.mass += prey.mass * 0.8;
          // Scale visual radius slowly
          bh.radius = Math.max(bh.radius, Math.min(60, bh.radius + prey.radius * 0.15));
          
          destroyedIds.add(prey.id);
          
          if (onEvent) {
            onEvent({ type: 'absorption', mass: prey.mass });
          }
          continue;
        }

        // Scenario B: Normal Collision
        if (collisionMode === 'merge') {
          // Merge inelastic: larger absorbs smaller, conserving momentum
          const larger = b1.mass >= b2.mass ? b1 : b2;
          const smaller = b1.mass >= b2.mass ? b2 : b1;

          const totalMass = larger.mass + smaller.mass;
          
          if (!larger.isStatic) {
            larger.vx = (larger.vx * larger.mass + smaller.vx * smaller.mass) / totalMass;
            larger.vy = (larger.vy * larger.mass + smaller.vy * smaller.mass) / totalMass;
          }
          
          larger.mass = totalMass;
          larger.radius = Math.max(larger.radius, Math.min(80, larger.radius + smaller.radius * 0.25));
          
          // Average color based on mass ratio (beautiful gradient blend!)
          larger.color = blendHSLColors(larger.color, smaller.color, smaller.mass / totalMass);

          destroyedIds.add(smaller.id);

          if (onEvent) {
            onEvent({ type: 'collision', intensity: totalMass / 200 });
          }
        } else {
          // Bounce elastic collision
          // 2D Elastic Collision Equations
          const nx = dx / dist; // normal vector
          const ny = dy / dist;
          const tx = -ny;       // tangent vector
          const ty = nx;

          // Dot product velocities
          const dpNorm1 = b1.vx * nx + b1.vy * ny;
          const dpTang1 = b1.vx * tx + b1.vy * ty;
          
          const dpNorm2 = b2.vx * nx + b2.vy * ny;
          const dpTang2 = b2.vx * tx + b2.vy * ty;

          // Conservation of momentum along normal vector
          const m1 = b1.mass;
          const m2 = b2.mass;

          const momentum1 = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
          const momentum2 = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);

          // Update velocities
          if (!b1.isStatic) {
            b1.vx = momentum1 * nx + dpTang1 * tx;
            b1.vy = momentum1 * ny + dpTang1 * ty;
          }
          if (!b2.isStatic) {
            b2.vx = momentum2 * nx + dpTang2 * tx;
            b2.vy = momentum2 * ny + dpTang2 * ty;
          }

          // Push them apart slightly to prevent sticking
          const overlap = minDist - dist;
          const pushX = nx * overlap * 0.5;
          const pushY = ny * overlap * 0.5;

          if (!b1.isStatic) {
            b1.x -= pushX;
            b1.y -= pushY;
          }
          if (!b2.isStatic) {
            b2.x += pushX;
            b2.y += pushY;
          }

          if (onEvent) {
            onEvent({ type: 'collision', intensity: (m1 + m2) / 300 });
          }
        }
      }
    }
  }

  // Filter out destroyed bodies
  return nextBodies.filter(b => !destroyedIds.has(b.id));
}

/**
 * Blend two HSL colors based on a factor
 * @param {string} hsl1 - Format "hsl(H, S%, L%)"
 * @param {string} hsl2 - Format "hsl(H, S%, L%)"
 * @param {number} factor - Blend factor 0 to 1
 */
function blendHSLColors(hsl1, hsl2, factor) {
  try {
    const parse = (hsl) => {
      const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (!match) return [200, 100, 50];
      return match.slice(1, 4).map(Number);
    };

    const [h1, s1, l1] = parse(hsl1);
    const [h2, s2, l2] = parse(hsl2);

    const h = Math.round(h1 + (h2 - h1) * factor);
    const s = Math.round(s1 + (s2 - s1) * factor);
    const l = Math.round(l1 + (l2 - l1) * factor);

    return `hsl(${h}, ${s}%, ${l}%)`;
  } catch (e) {
    return hsl1; // fallback
  }
}

/**
 * Project a future path for a body from current positions
 */
export function calculateFuturePath(bodies, G, activeBody, dragStart, dragEnd, dt = 1.0, steps = 150) {
  if (!activeBody) return [];

  // Create a deep copy of all bodies for prediction
  let simBodies = bodies.map(b => ({
    id: b.id,
    x: b.x,
    y: b.y,
    vx: b.vx,
    vy: b.vy,
    mass: b.mass,
    isStatic: b.isStatic,
    type: b.type,
    radius: b.radius
  }));

  // Create the simulated new body
  // Calculate initial velocity based on dragging vector
  const dragX = dragStart.x - dragEnd.x;
  const dragY = dragStart.y - dragEnd.y;
  
  // Velocity scaling factor
  const velocityScale = 0.12;
  const newBody = {
    id: 'preview',
    x: dragStart.x,
    y: dragStart.y,
    vx: dragX * velocityScale,
    vy: dragY * velocityScale,
    mass: activeBody.mass,
    isStatic: activeBody.isStatic,
    type: activeBody.type,
    radius: activeBody.radius
  };

  simBodies.push(newBody);

  const path = [];
  const previewInterval = 2; // record point every 2 simulation steps to extend length

  for (let s = 0; s < steps * previewInterval; s++) {
    // 1. Calculate gravity accelerations
    for (let i = 0; i < simBodies.length; i++) {
      const b1 = simBodies[i];
      if (b1.isStatic) continue;

      b1.ax = 0;
      b1.ay = 0;

      for (let j = 0; j < simBodies.length; j++) {
        if (i === j) continue;
        const b2 = simBodies[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distSq = dx * dx + dy * dy;
        
        const softenedDistSq = distSq + SOFTENING * SOFTENING;
        const softenedDistCubed = Math.pow(softenedDistSq, 1.5);
        const forceMag = (G * b2.mass) / softenedDistCubed;
        
        b1.ax += forceMag * dx;
        b1.ay += forceMag * dy;
      }
    }

    // 2. Update velocity and position
    for (let i = 0; i < simBodies.length; i++) {
      const b = simBodies[i];
      if (!b.isStatic) {
        b.vx += b.ax * dt;
        b.vy += b.ay * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
    }

    // 3. Save preview point
    if (s % previewInterval === 0) {
      path.push({ x: newBody.x, y: newBody.y });
    }
  }

  return path;
}

/**
 * Warp a grid coordinates system towards massive bodies to draw dynamic gravity wells
 * @param {number} x - Grid line x position
 * @param {number} y - Grid line y position
 * @param {Array} bodies - List of stellar bodies
 * @returns {Object} - The warped {x, y} coordinates
 */
export function warpCoordinates(x, y, bodies) {
  let dxSum = 0;
  let dySum = 0;

  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (b.mass < 500) continue; // Only massive bodies distort space visibly

    const dx = b.x - x;
    const dy = b.y - y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    if (dist < 10) continue;

    // Distortion equation: pulls grid coordinates inward
    // Scaling pulls higher mass more, and decays over distance
    const warpStrength = b.type === 'blackhole' ? 1.6 : 0.8;
    const force = (b.mass * warpStrength) / (dist + b.radius * 2);
    
    // Cap the maximum warp to prevent visual clipping
    const cappedForce = Math.min(0.65, force / 40);

    dxSum += (dx / dist) * cappedForce * Math.min(dist, 100);
    dySum += (dy / dist) * cappedForce * Math.min(dist, 100);
  }

  return {
    x: x + dxSum,
    y: y + dySum
  };
}
