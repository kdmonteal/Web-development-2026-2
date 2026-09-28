# Panda cursor tracking

npm create vite@latest panda-tracker -- --template react
npm i three @react-three/fiber @react-three/drei
npm i -D tailwindcss @tailwindcss/vite

vite.config.js: plugins: [react(), tailwindcss()]
src/index.css:  @import "tailwindcss";
Copia src/ de esta carpeta y pon tu modelo en public/models/panda.glb
