runBabel(){
  babel src -d out
}

runDev(){
   runBabel && node out/index.js
}

"$@"
