// Preview stand-in for src/assets/block-party-music.png
// See block-party-aerial.png.ts â the real photo stays in the repo.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img">
  <rect width="1200" height="800" fill="#f0d9a8"/>
  <circle cx="600" cy="330" r="220" fill="#f2a65a" opacity="0.55"/>

  <!-- bunting across the top -->
  <path d="M0 60 Q300 140 600 70 T1200 60" stroke="#e2725b" stroke-width="6" fill="none"/>
  <g fill="#e2725b">
    <polygon points="150,95 190,95 170,140"/>
    <polygon points="330,118 370,118 350,163"/>
    <polygon points="510,110 550,110 530,155"/>
  </g>
  <g fill="#7fa66b">
    <polygon points="240,110 280,110 260,155"/>
    <polygon points="420,122 460,122 440,167"/>
    <polygon points="690,105 730,105 710,150"/>
    <polygon points="870,118 910,118 890,163"/>
  </g>

  <!-- stage, speakers, players -->
  <rect x="300" y="470" width="600" height="200" rx="16" fill="#8f887a"/>
  <rect x="300" y="470" width="600" height="24" rx="10" fill="#6f695d"/>
  <rect x="210" y="420" width="80" height="250" rx="12" fill="#3f3a33"/>
  <rect x="910" y="420" width="80" height="250" rx="12" fill="#3f3a33"/>
  <circle cx="250" cy="490" r="26" fill="#e7d9bd"/>
  <circle cx="950" cy="490" r="26" fill="#e7d9bd"/>
  <g fill="#e2725b">
    <rect x="470" y="380" width="52" height="120" rx="20"/>
    <rect x="600" y="360" width="52" height="140" rx="20"/>
    <rect x="720" y="390" width="52" height="110" rx="20"/>
  </g>
  <g fill="#3f3a33">
    <circle cx="496" cy="348" r="30"/>
    <circle cx="626" cy="328" r="30"/>
    <circle cx="746" cy="358" r="30"/>
  </g>

  <!-- notes in the fog -->
  <g fill="#5b5347" opacity="0.8">
    <circle cx="380" cy="230" r="16"/><rect x="392" y="170" width="6" height="62"/>
    <circle cx="820" cy="200" r="16"/><rect x="832" y="140" width="6" height="62"/>
    <circle cx="960" cy="270" r="12"/><rect x="969" y="222" width="5" height="50"/>
  </g>

  <text x="600" y="750" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#5b5347">
    music on the block &#183; photo placeholder
  </text>
</svg>`;

export default `data:image/svg+xml,${encodeURIComponent(svg)}`;