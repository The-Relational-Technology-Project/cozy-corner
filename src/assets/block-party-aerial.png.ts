// Preview stand-in for src/assets/block-party-aerial.png
// The real photograph is in the repo; binary files don't transfer through the
// GitHub import, so this module fills the gap inside the builder preview.
// A real Vite build resolves the actual .png first and ignores this file.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img">
  <rect width="1200" height="800" fill="#e7d9bd"/>

  <!-- the avenue, closed to cars -->
  <rect x="430" y="0" width="340" height="800" fill="#8f887a"/>
  <rect x="410" y="0" width="20" height="800" fill="#d8cbb0"/>
  <rect x="770" y="0" width="20" height="800" fill="#d8cbb0"/>
  <g stroke="#f0e6cf" stroke-width="6" stroke-dasharray="34 30" opacity="0.7">
    <line x1="600" y1="0" x2="600" y2="800"/>
  </g>

  <!-- houses along the block -->
  <g>
    <rect x="120" y="60" width="270" height="150" rx="8" fill="#f2a65a"/>
    <rect x="120" y="240" width="270" height="150" rx="8" fill="#e2725b"/>
    <rect x="120" y="420" width="270" height="150" rx="8" fill="#f0d9a8"/>
    <rect x="120" y="600" width="270" height="150" rx="8" fill="#7fa66b"/>
    <rect x="810" y="60" width="270" height="150" rx="8" fill="#f0d9a8"/>
    <rect x="810" y="240" width="270" height="150" rx="8" fill="#7fa66b"/>
    <rect x="810" y="420" width="270" height="150" rx="8" fill="#f2a65a"/>
    <rect x="810" y="600" width="270" height="150" rx="8" fill="#e2725b"/>
  </g>

  <!-- canopies, tables, neighbors -->
  <g opacity="0.95">
    <rect x="455" y="90" width="130" height="90" rx="10" fill="#e2725b"/>
    <rect x="620" y="210" width="130" height="90" rx="10" fill="#7fa66b"/>
    <rect x="455" y="360" width="130" height="90" rx="10" fill="#f2a65a"/>
    <rect x="620" y="520" width="130" height="90" rx="10" fill="#e2725b"/>
    <rect x="470" y="640" width="240" height="40" rx="14" fill="#f4ead3"/>
    <rect x="470" y="290" width="120" height="34" rx="12" fill="#f4ead3"/>
  </g>
  <g fill="#3f3a33" opacity="0.75">
    <circle cx="500" cy="230" r="11"/><circle cx="536" cy="246" r="11"/>
    <circle cx="672" cy="336" r="11"/><circle cx="706" cy="318" r="11"/>
    <circle cx="512" cy="470" r="11"/><circle cx="548" cy="492" r="11"/>
    <circle cx="662" cy="626" r="11"/><circle cx="698" cy="606" r="11"/>
    <circle cx="590" cy="700" r="11"/><circle cx="626" cy="716" r="11"/>
  </g>

  <text x="600" y="770" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#5b5347">
    block party aerial &#183; photo placeholder
  </text>
</svg>`;

export default `data:image/svg+xml,${encodeURIComponent(svg)}`;