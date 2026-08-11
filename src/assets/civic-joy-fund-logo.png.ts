// Preview stand-in for src/assets/civic-joy-fund-logo.png
// The real sponsor logo stays in the repo and is used by the published build.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" width="480" height="180" role="img">
  <rect width="480" height="180" rx="16" fill="#f4ead3"/>
  <rect x="6" y="6" width="468" height="168" rx="12" fill="none" stroke="#e2725b" stroke-width="3" stroke-dasharray="10 8"/>
  <circle cx="86" cy="90" r="34" fill="#f2a65a"/>
  <path d="M64 96 Q86 122 108 96" stroke="#3f3a33" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="75" cy="80" r="5" fill="#3f3a33"/>
  <circle cx="97" cy="80" r="5" fill="#3f3a33"/>
  <text x="146" y="82" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#3f3a33">Civic Joy Fund</text>
  <text x="146" y="122" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#5b5347">logo placeholder</text>
</svg>`;

export default `data:image/svg+xml,${encodeURIComponent(svg)}`;