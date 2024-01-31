#compile wasm
wasm-pack build --target web

#run server
python3 -m http.server