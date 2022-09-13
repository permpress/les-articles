
# Bundle js
npx esbuild public/index.js  \
    --bundle --minify --sourcemap --target=chrome58,firefox57,safari11,edge16   \
    --outfile=dist/www/index.js