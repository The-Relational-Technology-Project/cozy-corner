// Preview stand-in for src/assets/osl-logo.png
// The real logo stays in the repo and is used by the published build.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" width="480" height="180" role="img">
  <rect width="480" height="180" rx="16" fill="#f4ead3"/>
  <rect x="6" y="6" width="468" height="168" rx="12" fill="none" stroke="#7fa66b" stroke-width="3" stroke-dasharray="10 8"/>
  <circle cx="86" cy="90" r="34" fill="#7fa66b"/>
  <path d="M58 104 Q86 84 114 104" stroke="#f4ead3" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M58 84 Q86 64 114 84" stroke="#f4ead3" stroke-width="7" fill="none" stroke-linecap="round"/>
  <text x="146" y="82" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#3f3a33">OSL</text>
  <text x="146" y="122" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#5b5347">logo placeholder</text>
</svg>`;

export default `data:image/svg+xml,${encodeURIComponent(svg)}`;